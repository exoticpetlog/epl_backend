const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");

module.exports = {
  getHistory: async (parentValue, args, req) => {
    const animal = await db("animals")
      .where({ id: args.animal_id })
      .first();
    await checkAccess(animal, req);
    return await db("history").where({ animal_id: args.animal_id });
  },
  createHistory: async (parentValue, args, req) => {
    const animal = await db("animals")
      .where({ id: args.animal_id })
      .first();
    await checkAccess(animal, req);
    args.initiating_user = req.user.id;
    const action = await db("actions").where({ id: args.action_id });
    if (action.two_stage) {
      args.is_complete = false;
      args.success = false;
    } else {
      args.is_complete = true;
      args.success = true;
      args.closing_user = req.user.id;
    }
    const [inserted] = await db("history")
      .insert(args)
      .returning("*");
    return inserted;
  },
  updateHistory: async (parentValue, args, req) => {
    const historyItem = await db("history")
      .where({ id: args.id })
      .join("animals", "animals.id", "=", "history.animal_id")
      .first();
    await checkAccess(historyItem, req);
    const [updated] = await db("history")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
