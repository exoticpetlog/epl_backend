const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { orgsQueryFields, orgsMutationFields } = require("./orgs/orgsSchema.js");

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...orgsQueryFields
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...orgsMutationFields
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
