const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { orgsQueryFields, orgsMutationFields } = require("./orgs/orgsSchema.js");
const {
  speciesQueryFields,
  speciesMutationFields
} = require("./species/speciesSchema.js");

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...orgsQueryFields,
    ...speciesQueryFields
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...orgsMutationFields,
    ...speciesMutationFields
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
