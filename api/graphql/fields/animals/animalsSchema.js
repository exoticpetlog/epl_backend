const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const {
  getAnimal,
  getAnimals,
  createAnimal,
  updateAnimal,
} = require("./animalsResolves.js");

const { historyType } = require("../history/historySchema");
const { speciesType } = require("../species/speciesSchema");
const { actionsType } = require("../actions/actionsSchema");

const animalsType = new GraphQLObjectType({
  name: "animals",
  fields: () => ({
    id: { type: GraphQLInt },
    species_id: { type: GraphQLInt },
    org_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
    created_at: { type: GraphQLString },
    history: { type: new GraphQLList(historyType) },
    species: { type: speciesType },
    actions: { type: new GraphQLList(actionsType) },
  }),
});

const animalsQueryFields = {
  animals: {
    type: new GraphQLList(animalsType),
    args: {
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: getAnimals,
  },
  animal: {
    type: animalsType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: getAnimal,
  },
};

const animalsMutationFields = {
  createAnimal: {
    type: animalsType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
      species_id: { type: new GraphQLNonNull(GraphQLInt) },
      description: { type: GraphQLString },
      notes: { type: GraphQLString },
    },
    resolve: createAnimal,
  },
  updateAnimal: {
    type: animalsType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      org_id: { type: GraphQLInt },
      species_id: { type: GraphQLInt },
      description: { type: GraphQLString },
      notes: { type: GraphQLString },
    },
    resolve: updateAnimal,
  },
};

module.exports = {
  animalsQueryFields,
  animalsMutationFields,
  animalsType,
};
