const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const {
  getActions,
  createAction,
  updateAction
} = require("./actionsResolves.js");

const actionsType = new GraphQLObjectType({
  name: "actions",
  fields: () => ({
    id: { type: GraphQLInt },
    species_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    two_stage: { type: GraphQLBoolean }
  })
});

const actionsQueryFields = {
  actions: {
    type: new GraphQLList(actionsType),
    args: {
      species_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: getActions
  }
};

const actionsMutationFields = {
  createAction: {
    type: actionsType,
    args: {
      species_id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      two_stage: { type: GraphQLBoolean }
    },
    resolve: createAction
  },
  updateAction: {
    type: actionsType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      two_stage: { type: GraphQLBoolean }
    },
    resolve: updateAction
  }
};

module.exports = {
  actionsQueryFields,
  actionsMutationFields
};
