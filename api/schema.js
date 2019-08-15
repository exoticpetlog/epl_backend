const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const orgsType = new GraphQLObjectType({
  name: "orgs",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    owner_id: { type: GraphQLInt }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    orgs: orgsType,
    //   args: {
    //     id: { type: GraphQLInt },
    //     name: { type: GraphQLString },
    //   }
    resolve(parentValue, args) {
      return { name: "Hiya There", id: 5, owner_id: 12 };
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery
});
