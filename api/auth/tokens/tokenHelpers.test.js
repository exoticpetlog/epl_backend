const { verifyToken, getToken } = require("./tokenHelpers.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const pause = require("../../testHelpers/pauseTest.js");
const db = require("../../../config/dbConfig.js");

describe("Token Vaidation", () => {
  beforeAll(async () => {
    await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
    return pause();
  });

  describe("verifyToken middleware fn", () => {
    const username = "daBestUser";
    let token;

    beforeAll(async () => {
      await pause();
      const [id] = await db("users")
        .insert({
          username,
          password: "passPass",
          email: "myEmail@email.emails"
        })
        .returning("id");

      token = getToken(id);

      return pause();
    });
    afterAll(() => {
      db.destroy();
    });
    describe("responds 400 + message if:", () => {
      test("no authorization header", async () => {
        const res = new Res();
        const req = new Req();
        await verifyToken(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("authorization");
        expect(res.jsonSent.message).toContain("header");
      });

      test("token is invalid", async () => {
        const res = new Res();
        const req = new Req(
          {},
          {
            authorization: "jsn010nsGARBAGETOKEN02884"
          }
        );
        await verifyToken(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("token");
        expect(res.jsonSent.message).toContain("invalid");
      });
    });

    describe("valid token should:", () => {
      test("put user object from db on req body", async () => {
        const res = new Res();
        const req = new Req(
          {},
          {
            authorization: token
          }
        );
        await verifyToken(req, res, next);
        expect(req.user.username).toEqual(username);
      });

      test("not attach user password with user object", async () => {
        const res = new Res();
        const req = new Req(
          {},
          {
            authorization: token
          }
        );
        await verifyToken(req, res, next);
        expect(req.user.password).toBeUndefined();
        expect(req.user).not.toBeUndefined();
      });
    });
  });
});
