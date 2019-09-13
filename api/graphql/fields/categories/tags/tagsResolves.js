const db = require("../../../../../config/dbConfig.js");
const {
  checkAccess,
  checkOwner,
} = require("../../../authorization/accessHelpers.js");
const { GraphQLError } = require("graphql");

module.exports = {
  getByTag: async (parentValue, args, req) => {
    const category = await db("categories").where({ id: args.category_id });
    await checkAccess(category, req);
    const animalList = await db("categories")
      .where({ "category.id": args.category_id })
      .join(
        "animals_categories",
        "animals_categories.category_id",
        "=",
        "categories.id"
      )
      .join("animals", "animals.id", "=", "animals_categories.animal_id");
    return animalList;
  },

  addTag: async (parentValue, args, req) => {},

  removeTag: async (parentValue, args, req) => {},
};
