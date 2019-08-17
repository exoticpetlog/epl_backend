const login = require("./login.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const db = require("../../../config/dbConfig.js");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  return db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

describe("Auth Routes", () => {
  describe("Login Endpoint", () => {
    const username = "test2";
    const password = "pass2";
    const email = "email2@things.stuff";

    beforeAll(() => {
      return db("users").insert({
        username,
        password: bcrypt.hashSync(password, 8),
        email
      });
    }, 200);

    describe("successful login info should:", () => {
      test("respond with 200 and token", async () => {
        const res = new Res();
        const req = new Req({ username, password });
        await login(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res.jsonSent.token).toBeTruthy();
      });

      test("works for email as username", async () => {
        const res = new Res();
        const req = new Req({ username: email, password });
        await login(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res.jsonSent.token).toBeTruthy();
      });
    });

    describe("sends 400 + message if:", () => {
      test("missing username", async () => {
        const res = new Res();
        const req = new Req({ email, password });
        await login(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("username");
      });

      test("missing password", async () => {
        const res = new Res();
        const req = new Req({ username, email });
        await login(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("password");
      });

      test("wrong password", async () => {
        const res = new Res();
        const req = new Req({ username, password: "notthecorrectpw" });
        await login(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("invalid");
      });

      test("username (and email) DNE", async () => {
        const res = new Res();
        const req = new Req({ username: "someOtherUser", password });
        await login(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("invalid");
      });
    });
  });
});
