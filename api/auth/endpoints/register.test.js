const register = require("./register.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");

describe("register endpoint", () => {
  describe("responds 400 + message if missing info", () => {
    const username = "test1";
    const password1 = "pass1";
    const password2 = "pass2";
    const email = "email";
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
});
