const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");

module.exports = {
  getActions: async (parentValue, args, req) => {
    const species = await db("species")
      .where({ id: args.species_id })
      .first();
    await checkAccess(species, req);
    return await db("actions").where(args);
  },
  createAction: async (parentValue, args, req) => {
    const species = await db("species")
      .where({ id: args.species_id })
      .first();
    await checkAccess(species, req);
    const [inserted] = await db("actions")
      .insert(args)
      .returning("*");
    return inserted;
  },
  updateAction: async (parentValue, args, req) => {}
};
