const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");
const mergeSelections = require("../../helpers/mergeFieldNodes");

module.exports = {
  getAnimals: async (parentValue, args, req, info) => {
    await checkAccess(args, req);
    const selections = mergeSelections(info);
    for (let i in selections) {
      console.log(selections[i]);
    }
    return await db("animals").where({ org_id: args.org_id });
  },

  getAnimal: async (parentValue, args, req) => {
    const animal = await db("animals")
      .where({ id: args.id })
      .first();
    await checkAccess(animal, req);
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
