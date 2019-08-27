const db = require("../../../config/dbConfig.js");
const { checkAccess } = require("../authorization/accessHelpers.js");

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
    const toUpdate = await db("species")
      .where({ id: args.id })
      .first();
    await checkAccess(toUpdate, req);
    const [updated] = await db("species")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
