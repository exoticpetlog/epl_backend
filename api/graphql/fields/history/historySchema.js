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

const historyType = new GraphQLObjectType({});

module.exports = {
  historyQueryFields: {},

  historyMutationFields: {}
};
