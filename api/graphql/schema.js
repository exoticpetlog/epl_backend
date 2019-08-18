const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
} = require("graphql");

const { getOrgs, createOrg, updateOrg } = require("./orgs/orgsResolves");

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
    orgs: {
      type: new GraphQLList(orgsType),
      resolve: getOrgs
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createOrg: {
      type: orgsType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: createOrg
    },
    updateOrg: {
      type: orgsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        owner_id: { type: GraphQLInt }
      },
      resolve: updateOrg
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
