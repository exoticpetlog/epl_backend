const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const { getItems, createItem, updateItem } = require("./itemsResolves.js");

const itemsType = new GraphQLObjectType({
  name: "items",
  fields: () => ({
    id: { type: GraphQLInt },
    action_id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const itemsQueryFields = {
  items: {
    type: new GraphQLList(itemsType),
    args: {
      action_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: getItems
  }
};

const itemsMutationFields = {
  createItems: {
    type: itemsType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      action_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: createItem
  },
  updateItem: {
    type: itemsType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      action_id: { type: GraphQLInt }
    },
    resolve: updateItem
  }
};

module.exports = {
  itemsQueryFields,
  itemsMutationFields
};
