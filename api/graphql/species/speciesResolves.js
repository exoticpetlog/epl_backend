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
    // check org belongs to user
    // const org = await db("orgs")
    //   .where({ id: args.id })
    //   .first();
    // if (!org) {
    //   throw new GraphQLError(`org of id: ${args.id} does not exist`);
    // }
    // if (req.user.id !== org.owner_id) {
    //   throw new GraphQLError("your are not the owner of this org");
    // }
    // // if owner_id is in args, check there is user with that id
    // if (args.owner_id) {
    //   const new_owner = await db("users")
    //     .where({ id: args.owner_id })
    //     .first();
    //   if (!new_owner) {
    //     throw new GraphQLError(
    //       `no user of id: ${args.owner_id} exists to take take ownership`
    //     );
    //   }
    // }
    // // update the club info
    // const [updated] = await db("orgs")
    //   .where({ id: args.id })
    //   .update(args)
    //   .returning("*");
    // return updated;
  }
};
