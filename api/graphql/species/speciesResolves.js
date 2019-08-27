const db = require("../../../config/dbConfig.js");
const { GraphQLError } = require("graphql");

async function checkAccess(args, req) {
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

module.exports = {
  getSpecies: async (parentValue, args, req) => {
    await checkAccess(args, req);
    return await db("species").where({ org_id: args.org_id });
  },

  createSpecies: async (parentValue, args, req) => {
    await checkAccess(args, req);
    const [newSpecies] = await db("species")
      .insert({ org_id: args.org_id, name: args.name })
      .returning("*");
    return newSpecies;
  },

  updateSpecies: async (parentValue, args, req) => {
    // check species of id is of proper org
    const speciesToUpdate = await db("species")
      .where({ id: args.id })
      .first();
    args.org_id = speciesToUpdate.org_id;
    await checkAccess(args, req);
    delete args.org_id;
    const [updated] = await db("species")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
