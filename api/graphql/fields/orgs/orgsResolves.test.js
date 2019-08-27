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
      const req1 = new Req();
      const req2 = new Req();
      const args1 = { name: "My Test Org" };
      const args2 = { name: "Second Org" };
      let org_id, user1, user2, res, orgsList;

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

        user1 = await db("users")
          .where({ username: "orgsTest1" })
          .first();
        req1.user = user1;

        user2 = await db("users")
          .where({ username: "orgsTest2" })
          .first();
        req2.user = user2;
      });

      describe("createOrg", () => {
        test("should put club on db", async () => {
          res = await createOrg(null, args1, req1);
          const org = await db("orgs")
            .where({ name: args1.name })
            .first();
          org_id = org.id;
          expect(org).toBeTruthy();
        });

        test("should add many-to-many relation", async () => {
          const relation = await db("users_orgs")
            .where({ org_id })
            .first();
          expect(relation.user_id).toEqual(user1.id);
        });

        test("should return inserted org", async () => {
          expect(res.name).toEqual(args1.name);
        });
      });

      describe("getOrgs", () => {
        test("should return list of orgs user is in", async () => {
          orgsList = await getOrgs(null, args1, req1);
          expect(orgsList[0].name).toEqual(args1.name);
        });

        test("should not return orgs of other users", async () => {
          await createOrg(null, args2, req2);
          expect(orgsList[1]).toBeFalsy();
        });
      });

      describe("updateOrg", () => {
        describe("should throw error if:", () => {
          test("user doesnt own org", async () => {
            let error;
            try {
              args1.id = orgsList[0].id;
              await updateOrg(null, args1, req2);
            } catch (err) {
              error = err;
            }
            expect(error).toBeTruthy();
          });

          test("transfering ownership to DNE user", async () => {
            let error;
            try {
              args1.owner_id = 50;
              await updateOrg(null, args1, req1);
            } catch (err) {
              error = err;
            }
            expect(error).toBeTruthy();
          });
        });
        test("should return updated org", async () => {
          args1.name = "some new name";
          delete args1.owner_id;
          const updated = await updateOrg(null, args1, req1);
          expect(updated.name).toEqual(args1.name);
        });
      });
    });
  });
});
