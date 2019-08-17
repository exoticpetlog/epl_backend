const { verifyToken, getToken } = require("./tokenHelpers.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const db = require("../../../config/dbConfig.js");

beforeAll(async () => {
  return db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

describe("Token Vaidation", () => {
  describe("verifyToken middleware fn", () => {
    beforeAll(() => {
      // there seems to be some 1/20 issue of
      // truncating in the main beforeAll
      // to finish truncating after tests start running
      // causing a failure 1/20 times
      // so here i add a promise timeout to explicitly set a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
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
        const username = "daBestUser";
        const id = await db("users")
          .insert({
            username,
            password: "passPass",
            email: "myEmail@email.emails"
          })
          .returning("id");
        const token = getToken(id);
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
        const id = await db("users")
          .insert({
            username: "daBestUser2",
            password: "passPass2",
            email: "myEmail2@email2.emails"
          })
          .returning("id");
        const token = getToken(id);
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
