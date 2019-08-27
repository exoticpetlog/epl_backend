const db = require("../../../config/dbConfig.js");
const { GraphQLError } = require("graphql");

module.exports = {
  checkAccess: async (args, req) => {
    const hasAccess = await db("users_orgs")
      .where({
        org_id: args.org_id,
        user_id: req.user.id
      })
      .first();
    if (!hasAccess) {
      throw new GraphQLError(`You do not have access to org: ${args.org_id}`);
    }
  }
};
