const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");

module.exports = {
  getCategories: async (parentValue, args, req) => {
    await checkAccess(args, req);
    return await db("categories").where({ org_id: args.org_id });
  },

  createCategory: async (parentValue, args, req) => {
    await checkAccess(args, req);
    const [inserted] = await db("categories")
      .insert({
        org_id: args.org_id,
        name: args.name,
      })
      .returning("*");
    return inserted;
  },

  updateCategory: async (parentValue, args, req) => {
    const category = await db("categories")
      .where({ id: args.id })
      .first();
    await checkAccess(category, req);
    const [updated] = await db("categories")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  },
};
