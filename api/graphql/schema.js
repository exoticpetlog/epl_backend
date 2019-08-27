const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const {
  orgsQueryFields,
  orgsMutationFields
} = require("./fields/orgs/orgsSchema.js");
const {
  speciesQueryFields,
  speciesMutationFields
} = require("./fields/species/speciesSchema.js");
const {
  animalsQueryFields,
  animalsMutationFields
} = require("./fields/animals/animalsSchema.js");

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...orgsQueryFields,
    ...speciesQueryFields,
    ...animalsQueryFields
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...orgsMutationFields,
    ...speciesMutationFields,
    ...animalsMutationFields
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
