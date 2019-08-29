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

  removeMember: async (parentValue, args, req) => {},
};
