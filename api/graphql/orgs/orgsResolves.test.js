const { getOrgs, createOrg, updateOrg } = require("./orgsResolves");

// beforeAll(async () => {
//   return db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
// });

describe("GraphQL", () => {
  describe("Resolve Functions", () => {
    beforeAll(async () => {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
    });
    describe("orgs resolves", () => {});
  });
});
