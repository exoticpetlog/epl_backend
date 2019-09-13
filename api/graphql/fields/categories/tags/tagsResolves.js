const db = require("../../../../../config/dbConfig.js");
const { checkAccess } = require("../../../authorization/accessHelpers.js");
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

  addTag: async (parentValue, args, req) => {
    // check both animal and category have same org_id
    const category = await db("categories").where({ id: args.category_id });
    const animal = await db("animals").where({ id: args.animal_id });
    if (animal.org_id != category.org_id) {
      throw new GraphQLError(
        "Animal and Category must belong to the same organization"
      );
    }
    await checkAccess(animal, req);
    await db("animals_categories").insert(args);
    // TODO - return animal with connected tags - update animals as well
    return animal;
  },

  removeTag: async (parentValue, args, req) => {
    const animal = await db("animals").where({ id: args.animal_id });
    await checkAccess(animal, req);
    const tag = await db("animals_categories")
      .where(args)
      .delete()
      .returning("*")
      .first();
    if (!tag) {
      throw new GraphQLError(
        `Tag for category ${args.category_id} not found on animal ${args.animal_id}`
      );
    }
    // TODO - return animal with connected tags - update animals as well
    return animal;
  },
};
