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
        user_id: args.user_id,
        name: args.name,
      })
      .returning("*");
    return inserted;
  },

  updateCategory: async (parentValue, args, req) => {},
};
