const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {
  orgsQueryFields,
  orgsMutationFields,
} = require("./fields/orgs/orgsSchema.js");
const {
  speciesQueryFields,
  speciesMutationFields,
} = require("./fields/species/speciesSchema.js");
const {
  animalsQueryFields,
  animalsMutationFields,
} = require("./fields/animals/animalsSchema.js");
const {
  actionsQueryFields,
  actionsMutationFields,
} = require("./fields/actions/actionsSchema.js");
const {
  historyQueryFields,
  historyMutationFields,
} = require("./fields/history/historySchema.js");
const {
  itemsQueryFields,
  itemsMutationFields,
} = require("./fields/items/itemsSchema.js");
const {
  remindersQueryFields,
  remindersMutationFields,
} = require("./fields/reminders/remindersSchema.js");
const {
  categoriesQueryFields,
  categoriesMutationFields,
} = require("./fields/categories/categoriesSchema");

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...orgsQueryFields,
    ...speciesQueryFields,
    ...animalsQueryFields,
    ...actionsQueryFields,
    ...historyQueryFields,
    ...itemsQueryFields,
    ...remindersQueryFields,
    ...categoriesQueryFields,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...orgsMutationFields,
    ...speciesMutationFields,
    ...animalsMutationFields,
    ...actionsMutationFields,
    ...historyMutationFields,
    ...itemsMutationFields,
    ...remindersMutationFields,
    ...categoriesMutationFields,
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation,
});
