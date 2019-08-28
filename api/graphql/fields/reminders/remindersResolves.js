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

  updateReminder: async (parentValue, args, req) => {
    const reminder = await db("reminders")
      .where({ id: args.id })
      .first();
    await checkAccess(reminder, req);
    // set new next_due if last occurance or frequency changes
    if (args.last_occurance && !args.next_due) {
      let now = new Date();
      let frequency = args.frequency || reminder.frequency;
      args.next_due = now.setDate(now.getDate() + frequency);
    } else if (args.frequency && !args.next_due) {
      let date = reminder.next_due;
      args.next_due = date.setDate(
        date.getDate() + (args.frequency - reminder.frequency)
      );
    }
    const [updated] = await db("reminders")
      .where({ id: args.id })
      .update(args)
      .returning("*");
    return updated;
  }
};
