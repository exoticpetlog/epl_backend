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
  getAnimals: async (parentValue, args, req) => {
    await checkAccess(args, req);
    return await db("animals").where({ org_id: args.org_id });
  },

  getAnimal: async (parentValue, args, req) => {
    const animal = await db("animals")
      .where({ id: args.id })
      .first();
    await checkAccess(animal, req);
    return animal;
  },

  createAnimal: async (parentValue, args, req) => {},

  updateAnimal: async (parentValue, args, req) => {}
};
