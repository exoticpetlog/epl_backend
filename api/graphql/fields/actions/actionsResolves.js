const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");

module.exports = {
  getActions: async (parentValue, args, req) => {
    const species = await db("species")
      .where({ id: args.species_id })
      .first();
    await checkAccess(species, req);
    return await db("actions").where({ species_id: args.species_id });
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
  updateAction: async (parentValue, args, req) => {
    const species = await db("actions")
      .where({ "actions.id": args.id })
      .join("species", "species.id", "=", "actions.species_id");
    await checkAccess(species, req);
    const [updated] = await db("actions")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
