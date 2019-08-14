const register = require("./register.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const db = require("../../../config/dbConfig.js");

beforeAll(async () => {
  await db("users").truncate();
});

// afterEach(async () => {
//   await db("users").truncate();
// });

describe("Auth Routes", () => {
  describe("Register Endpoint", () => {
    const username = "test1";
    const password1 = "pass1";
    const password2 = "pass2";
    const email = "email";
    describe("responds 400 + message if missing info", () => {
      test("if missing username", () => {
        const res = new Res();
        const req = new Req({
          password1,
          password2,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).not.toBeUndefined();
      });
      test("if missing password1", () => {
        const res = new Res();
        const req = new Req({
          username,
          password2,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).not.toBeUndefined();
      });
      test("if missing password2", () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          email
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).not.toBeUndefined();
      });
      test("if missing email", () => {
        const res = new Res();
        const req = new Req({
          username,
          password1,
          password2
        });
        register(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res.jsonSent.message).not.toBeUndefined();
      });
    });
    describe("responds 400 + message if passwords don't match", () => {
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
        expect(res.jsonSent.message).not.toBeUndefined();
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
        expect(res.jsonSent.token).not.toBeUndefined();
      });
      test("adds user to database", async () => {
        const user = await db("users")
          .where({ username })
          .first();
        expect(user).not.toBeUndefined();
      });
    });
  });
});
