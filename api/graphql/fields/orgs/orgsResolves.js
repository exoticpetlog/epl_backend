const db = require("../../../../config/dbConfig.js");
const { GraphQLError } = require("graphql");

module.exports = {
  getOrgs: async (parentValue, args, req) => {
    const orgs = await db("users_orgs")
      .where({ "users_orgs.user_id": req.user.id })
      .join("orgs", "orgs.id", "=", "users_orgs.org_id");
    return orgs;
  },

  createOrg: async (parentValue, args, req) => {
    const [newOrg] = await db("orgs")
      .insert({
        name: args.name,
        owner_id: req.user.id
      })
      .returning("*");
    await db("users_orgs").insert({
      user_id: req.user.id,
      org_id: Number(newOrg.id)
    });
    return newOrg;
  },

  updateOrg: async (parentValue, args, req) => {
    // check org belongs to user
    const org = await db("orgs")
      .where({ id: args.id })
      .first();
    if (!org) {
      throw new GraphQLError(`org of id: ${args.id} does not exist`);
    }
    if (req.user.id !== org.owner_id) {
      throw new GraphQLError("your are not the owner of this org");
    }
    // if owner_id is in args, check there is user with that id
    if (args.owner_id) {
      const new_owner = await db("users")
        .where({ id: args.owner_id })
        .first();
      if (!new_owner) {
        throw new GraphQLError(
          `no user of id: ${args.owner_id} exists to take take ownership`
        );
      }
    }
    // update the club info
    const [updated] = await db("orgs")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
