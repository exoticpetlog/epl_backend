const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");
const mergeSelections = require("../../helpers/mergeFieldNodes");

module.exports = {
  getAnimals: async (parentValue, args, req) => {
    await checkAccess(args, req);
    return await db("animals").where({ org_id: args.org_id });
  },

  getAnimal: async (parentValue, args, req, info) => {
    const animal = await db("animals")
      .where({ id: args.id })
      .first();
    await checkAccess(animal, req);
    // conditional retrieval from other db table
    const selections = mergeSelections(info);
    if (selections.history) {
      animal.history = await db("history").where({ animal_id: animal.id });
    }
    if (selections.species) {
      animal.species = await db("species")
        .where({ id: animal.species_id })
        .first();
    }
    if (selections.actions) {
      animal.actions = await db("actions").where({
        species_id: animal.species_id,
      });
      for (let i in animal.actions) {
        animal.actions[i].items = await db("items").where({
          action_id: animal.actions[i].id,
        });
      }
    }
    return animal;
  },

  createAnimal: async (parentValue, args, req) => {
    await checkAccess(args, req);
    const [animal] = await db("animals")
      .insert(args)
      .returning("*");
    return animal;
  },

  updateAnimal: async (parentValue, args, req) => {
    const animal = await db("animals")
      .where({ id: args.id })
      .first();
    await checkAccess(animal, req);
    const [updated] = await db("animals")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  },
};
