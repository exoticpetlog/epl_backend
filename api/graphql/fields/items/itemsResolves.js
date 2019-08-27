const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");

module.exports = {
  getItems: async (parentValue, args, req) => {
    const action = await db("actions")
      .where({ id: args.action_id })
      .join("species", "species.id", "=", "actions.species_id")
      .first();
    await checkAccess(action, req);
    return await db("items").where({ action_id: args.action_id });
  },

  createItem: async (parentValue, args, req) => {
    const action = await db("actions")
      .where({ id: args.action_id })
      .join("species", "species.id", "=", "actions.species_id")
      .first();
    await checkAccess(action, req);
    const [inserted] = await db("items")
      .insert(args)
      .returning("*");
    return inserted;
  },

  updateItem: async (parentValue, args, req) => {
    const item = await db("items")
      .where({ id: args.id })
      .join("actions", "actions.id", "=", "items.action_id")
      .join("species", "species.id", "=", "actions.species_id");
    await checkAccess(item, req);
    const [updated] = await db("items")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
