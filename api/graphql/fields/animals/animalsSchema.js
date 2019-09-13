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

export const animalsType = new GraphQLObjectType({
  name: "animals",
  fields: () => ({
    id: { type: GraphQLInt },
    species_id: { type: GraphQLInt },
    org_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    notes: { type: GraphQLString },
    created_at: { type: GraphQLString },
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
};
