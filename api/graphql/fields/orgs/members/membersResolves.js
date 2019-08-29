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
          `user not found by username: ${args.username} or email: {args.email}`
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
    // allow user to remove self, otherwise check ownership to remove others
    let owner_id;
    if (args.user_id !== req.user.id) {
      owner_id = await checkOwner(args, req);
    }
    // restrict removing owner of org
    if (args.user_id == owner_id) {
      throw new GraphQLError("Cannot remove the owner of the org.");
    }
    const [deleted] = await db("users_orgs")
      .where({ user_id: args.user_id, org_id: args.org_id })
      .delete()
      .returning("*");

    return deleted;
  },
};
