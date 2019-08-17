const register = require("./register.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const db = require("../../../config/dbConfig.js");

beforeAll(async () => {
  return db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

describe("Auth Routes", () => {
  describe("Register Endpoint", () => {
    beforeAll(() => {
      // there seems to be some 1/20 issue of
      // truncating in the main beforeAll
      // to finish truncating after tests start running
      // causing a failure 1/20 times
      // so here i add a promise timeout to explicitly set a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
    });
    const username = "test1";
    const password1 = "pass1";
    const password2 = "pass2";
    const email = "email";
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
