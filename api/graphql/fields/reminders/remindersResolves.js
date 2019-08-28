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
      if (args.frequency) {
        now.setDate(now.getDate() + args.frequency);
      }
      args.next_due = now.toDateString();
    }
    const [inserted] = await db("reminders")
      .insert(args)
      .returning("*");
    return inserted;
  },

  updateReminder: async (parentValue, args, req) => {
    const reminder = await db("reminders")
      .where({ id: args.id })
      .first();
    await checkAccess(reminder, req);
    // set new next_due if last occurance or frequency changes
    if (args.last_occurance && !args.next_due) {
      let now = new Date();
      let frequency = args.frequency || reminder.frequency;
      now.setDate(now.getDate() + frequency);
      args.next_due = now.toDateString();
    } else if (args.frequency && !args.next_due) {
      let date = new Date(reminder.next_due);
      date.setDate(date.getDate() + (args.frequency - reminder.frequency));
      args.next_due = date.toDateString();
    }
    const [updated] = await db("reminders")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
