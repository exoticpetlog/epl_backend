const register = require("./register.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const db = require("../../../config/dbConfig.js");

beforeAll(async () => {
  return db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

describe("Auth Routes", () => {
  describe("Register Endpoint", () => {
    const username = "test1";
    const password1 = "pass1";
    const password2 = "pass2";
    const email = "email";

    beforeAll(() => {
      // had issues while using sqlite3 - test suite would sometimes start before db truncate completed
      // that required an explicit timeout to avoid, since this beforeAll has no db promises i added a pause
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
    });

    describe("good info creates user", () => {
      test("responds with 201 + token", async () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          password2: password1,
          email
        });
        await register(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res.jsonSent.token).toBeTruthy();
      });

      test("adds user to database", async () => {
        const user = await db("users")
          .where({ username })
          .first();
        expect(user).not.toBeUndefined();
      });
    });

    describe("responds 400 + message if:", () => {
      test("missing username", () => {
        const res = new Res();
        const req = new Req({
          password1,
          password2,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("username");
      });

      test("missing password1", () => {
        const res = new Res();
        const req = new Req({
          username,
          password2,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("password1");
      });

      test("missing password2", () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("password2");
      });

      test("missing email", () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          password2
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("email");
      });

      test("password1 != password2", () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          password2,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("not match");
      });

      test("username is taken", async () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          password2: password1,
          email: "someotheremail"
        });
        await register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("username");
        expect(res.jsonSent.message).toContain("in use");
      });

      test("email is taken", async () => {
        const res = new Res();
        const req = new Req({
          username: "someotherusername",
          password1,
          password2: password1,
          email
        });
        await register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).toContain("email");
        expect(res.jsonSent.message).toContain("in use");
      });
    });
  });
});
