const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const {
  getReminders,
  createReminder,
  updateReminder
} = require("./remindersResolves.js");

const remindersType = new GraphQLObjectType({
  name: "reminders",
  fields: () => ({
    id: { type: GraphQLInt },
    animal_id: { type: GraphQLInt },
    action_id: { type: GraphQLInt },
    org_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    item_id: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    frequency: { type: GraphQLInt },
    last_occurance: { type: GraphQLInt },
    next_due: { type: GraphQLString }
  })
});

module.exports = {
  remindersQueryFields: {
    reminders: {
      type: new GraphQLList(remindersType),
      args: {
        org_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: getReminders
    }
  },

  remindersMutationFields: {
    createReminder: {
      type: RemindersType,
      args: {
        animal_id: { type: new GraphQLNonNull(GraphQLInt) },
        action_id: { type: new GraphQLNonNull(GraphQLInt) },
        org_id: { type: new GraphQLNonNull(GraphQLInt) },
        item_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        frequency: { type: GraphQLInt },
        last_occurance: { type: GraphQLInt },
        next_due: { type: GraphQLString }
      },
      resolve: createReminder
    },
    updateReminder: {
      type: remindersType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        animal_id: { type: GraphQLInt },
        action_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        frequency: { type: GraphQLInt },
        last_occurance: { type: GraphQLInt },
        next_due: { type: GraphQLString }
      },
      resolve: updateReminder
    }
  }
};
