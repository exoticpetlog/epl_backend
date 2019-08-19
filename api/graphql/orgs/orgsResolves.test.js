const { Req, Res, next } = require("../../testHelpers/testReqResNext.js");
const db = require("../../../config/dbConfig.js");
const { getOrgs, createOrg, updateOrg } = require("./orgsResolves");

describe("GraphQL", () => {
  beforeAll(async () => {
    await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
    await db.raw("TRUNCATE TABLE orgs RESTART IDENTITY CASCADE");
    await db.raw("TRUNCATE TABLE users_orgs RESTART IDENTITY CASCADE");
  });
  describe("Resolve Functions", () => {
    afterAll(() => {
      db.destroy();
    });
    describe("orgs resolves", () => {
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
      });
      describe("createOrg", () => {
        const req = new Req();
        const name = "My Test Org";
        const args = { name };
        let org_id, user, res;
        test("should put club on db", async () => {
          user = await db("users")
            .where({ username: "orgsTest1" })
            .first();
          req.user = user;
          res = await createOrg(null, args, req);
          const club = await db("orgs")
            .where({ name })
            .first();
          org_id = club.id;
          expect(club).toBeTruthy();
        });
        test("should add many-to-many relation", async () => {
          const relation = await db("users_orgs")
            .where({ org_id })
            .first();
          expect(relation.user_id).toEqual(user.id);
        });
        test("should return inserted org", async () => {
          expect(res.name).toEqual(name);
        });
      });
      describe("getOrgs", () => {
        test("", () => {
          expect(true).toBeTruthy();
        });
      });
    });
  });
});
