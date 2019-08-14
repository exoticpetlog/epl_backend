const login = require("./login.js");
const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");

beforeAll(async () => {
  await db("users").truncate();
});

describe("Auth Routes", () => {
  describe("Login Endpoint", () => {
    describe("successful login info should:", () => {
      test("respond with 200 and token", () => {});
      test("work for email as username", () => {});
    });
    describe("sends 400 + response if:", () => {
      test("missing username", () => {});
      test("missing password", () => {});
      test("wrong password", () => {});
      test("username DNE", () => {});
    });
  });
});
