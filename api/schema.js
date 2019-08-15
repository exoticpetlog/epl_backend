const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const db = require("../config/dbConfig.js");

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
      type: orgsType,
      //   args: {
      //     id: { type: GraphQLInt },
      //     name: { type: GraphQLString },
      //   }
      resolve: async (parentValue, args, req) => {
        let orgs = await db("orgs")
          .where({ id: req.user.id })
          .first();
        return orgs;
      }
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
        // owner_id: { type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: async (parentValue, args, req) => {
        const ids = await db("orgs").insert({
          name: args.name,
          owner_id: req.user.id
        });
        const org = await db("orgs")
          .where({ id: ids[0] })
          .first();
        return org;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
