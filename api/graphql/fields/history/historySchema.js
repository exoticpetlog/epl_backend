const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const {
  getHistory,
  createHistory,
  updateHistory
} = require("./historyResolves.js");

const historyType = new GraphQLObjectType({
  name: "history",
  fields: () => ({
    id: { type: GraphQLInt },
    animal_id: { type: GraphQLInt },
    action_id: { type: GraphQLInt },
    success: { type: GraphQLBoolean },
    is_complete: { type: GraphQLBoolean },
    initiating_user: { type: GraphQLInt },
    closing_user: { type: GraphQLInt },
    created_at: { type: GraphQLString }
  })
});

module.exports = {
  historyQueryFields: {
    history: {
      type: new GraphQLList(historyType),
      args: {
        animal_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: getHistory
    }
  },

  historyMutationFields: {
    createHistory: {
      type: historyType,
      args: {
        animal_id: { type: new GraphQLNonNull(GraphQLInt) },
        action_id: { type: GraphQLInt }
      },
      resolve: createHistory
    },
    updateHistory: {
      type: historyType,
      args: {
        success: { type: GraphQLBoolean },
        is_complete: { type: GraphQLBoolean }
      },
      resolve: updateHistory
    }
  }
};
