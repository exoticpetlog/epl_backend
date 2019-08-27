const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const {
  getActions,
  createAction,
  updateAction
} = require("./actionsResolves.js");

const actionsQueryFields = {};

const actionsMutationFields = {};

module.exports = {
  actionsQueryFields,
  actionsMutationFields
};
