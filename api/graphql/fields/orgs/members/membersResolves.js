const db = require("../../../../../config/dbConfig.js");
const {
  checkAccess,
  checkOwner,
} = require("../../../authorization/accessHelpers.js");
const { GraphQLError } = require("graphql");

module.exports = {
  getMembers: async (parentValue, args, req) => {
    await checkAccess(args, req);
    return await db("users_orgs")
      .where({ org_id: args.org_id })
      .join("users", "users.id", "=", "users_orgs.user_id")
      .select("username", "org_id", "user_id");
  },

  addMember: async (parentValue, args, req) => {
    await checkOwner(args, req);
    //find the user_id
    let user;
    if (args.username || args.email) {
      if (args.username) {
        user = await db("users")
          .where({ username: args.username })
          .first();
      }
      if (!user && args.email) {
        user = await db("users")
          .where({ email: args.email })
          .first();
      }
      if (!user) {
        throw new GraphQLError(
          `user not found by username: ${args.username} or email: ${args.email}`
        );
      }
    } else {
      throw new GraphQLError("Please add by either username or email");
    }

    const [added] = await db("users_orgs")
      .insert({ user_id: user.id, org_id: args.org_id })
      .returning("*");

    added.username = user.username;
    added.email = user.email;
    return added;
  },

  removeMember: async (parentValue, args, req) => {
    const org = await db("orgs")
      .where({ id: args.org_id })
      .first();
    // restrict removing owner of org
    if (args.user_id == org.owner_id) {
      throw new GraphQLError("Cannot remove the owner of the org.");
    }
    // owner removes any, non-owner removes self
    else if (args.user_id == req.user.id || req.user.id == org.owner_id) {
      const user = await db("users")
        .where({ id: args.user_id })
        .first();
      const [deleted] = await db("users_orgs")
        .where({ user_id: args.user_id, org_id: args.org_id })
        .delete()
        .returning("*");
      deleted.username = user.username;
      deleted.email = user.email;
      return deleted;
    }
  },
};
