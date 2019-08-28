const db = require("../../../../config/dbConfig.js");
const { checkAccess } = require("../../authorization/accessHelpers.js");

module.exports = {
  getReminders: async (parentValue, args, req) => {
    await checkAccess(args, req);
    return await db("reminders").where({ org_id: args.org_id });
  },

  createReminder: async (parentValue, args, req) => {
    await checkAccess(args, req);
    if (!args.next_due) {
      let now = new Date();
      args.next_due = now;
      if (args.frequency) {
        args.next_due = now.setDate(now.getDate() + frequency);
      }
    }
    const [inserted] = await db("reminders")
      .insert(args)
      .returning("*");
    return inserted;
  },

  updateReminder: async (parentValue, args, req) => {}
};
