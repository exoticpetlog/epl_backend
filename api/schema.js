const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
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
        // TODO - utilize returning after switching to postgres
        const org = await db("orgs")
          .where({ id: ids[0] })
          .first();
        return org;
      }
    },
    updateOrg: {
      type: orgsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        owner_id: { type: GraphQLInt }
      },
      resolve: async (parentValue, args, req) => {
        // check org belongs to user
        const org = await db("orgs")
          .where({ id: args.id })
          .first();
        if (!org) {
          throw new GraphQLError(`org of id: ${args.id} does not exist`);
        }
        if (req.user.id !== org.owner_id) {
          throw new GraphQLError("your are not the owner of this org");
        }

        // if owner_id is in args, check there is user with that id
        if (args.owner_id) {
          const new_owner = await db("users")
            .where({ id: args.owner_id })
            .first();
          if (!new_owner) {
            throw new GraphQLError(
              `no user of id: ${args.owner_id} exists to take take ownership`
            );
          }
        }
        // update the club info
        const updated = await db("orgs")
          .where({ id: args.id })
          .update(args);
        // TODO - utilize returning after switching to postgres
        // .returning("*");
        const updatedOrg = await db("orgs")
          .where({ id: args.id })
          .first();
        return updatedOrg;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
