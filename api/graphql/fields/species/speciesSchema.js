const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const {
  getSpecies,
  createSpecies,
  updateSpecies,
} = require("./speciesResolves.js");

const speciesType = new GraphQLObjectType({
  name: "species",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    org_id: { type: GraphQLInt },
  }),
});

const speciesQueryFields = {
  species: {
    type: new GraphQLList(speciesType),
    args: {
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: getSpecies,
  },
};

const speciesMutationFields = {
  createSpecies: {
    type: speciesType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: createSpecies,
  },
  updateSpecies: {
    type: speciesType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      org_id: { type: GraphQLInt },
    },
    resolve: updateSpecies,
  },
};

module.exports = {
  speciesType,
  speciesQueryFields,
  speciesMutationFields,
};
