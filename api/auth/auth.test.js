require("dotenv").config();
const request = require("supertest");
const db = require("../../config/dbConfig.js");
const server = require("../server.js");
const { errorResponses } = require("./errorResponses.js");

beforeAll(async () => {
  await db("users").truncate();
});

afterEach(async () => {
  await db("users").truncate();
});

describe("auth Routes", () => {
  describe("register endpoint", () => {
    describe("responds if missing info", () => {
      const username = "test1";
      const password1 = "pass1";
      const password2 = "pass2";
      const email = "email";
      test("if missing username", () => {
        request(server)
          .post("/auth/register")
          .send({
            password1,
            password2,
            email
          })
          .then(res => {
            expect(res.status).toBe(errorResponses["missing"]["status"]);
            expect(res.body).toEqual(errorResponses["missing"]["body"]);
          });
      });
      test("if missing password1", () => {
        request(server)
          .post("/auth/register")
          .send({
            username,
            password2,
            email
          })
          .then(res => {
            expect(res.status).toBe(errorResponses["missing"]["status"]);
            expect(res.body).toEqual(errorResponses["missing"]["body"]);
          });
      });
      test("if missing password2", () => {
        request(server)
          .post("/auth/register")
          .send({
            username,
            password1,
            email
          })
          .then(res => {
            expect(res.status).toBe(errorResponses["missing"]["status"]);
            expect(res.body).toEqual(errorResponses["missing"]["body"]);
          });
      });
      test("if missing email", () => {
        request(server)
          .post("auth/register")
          .send({
            username,
            password1,
            password2
          })
          .then(res => {
            expect(res.status).toBe(errorResponses["missing"]["status"]);
            expect(res.body).toEqual(errorResponses["missing"]["body"]);
          });
      });
    });
  });
});
