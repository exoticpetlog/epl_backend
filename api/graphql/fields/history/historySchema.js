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
  historyQueryFields: {},

  historyMutationFields: {}
};
