const pause = require("../../testHelpers/pauseTest.js");
const db = require("../../../config/dbConfig.js");
const { getOrgs, createOrg, updateOrg } = require("./orgsResolves");

beforeAll(async () => {
  await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  return pause();
});

describe("GraphQL", () => {
  describe("Resolve Functions", () => {
    beforeAll(async () => {
      await db("users").insert([
        {
          username: "orgsTest1",
          password: "password1",
          email: "email1@2.test"
        },
        {
          username: "orgsTest2",
          password: "password2",
          email: "email2@2.test"
        }
      ]);

      return pause();
    });
    describe("orgs resolves", () => {
      describe("getOrgs", () => {
        test("", () => {
          expect(true).toBeTruthy();
        });
      });
    });
  });
});
