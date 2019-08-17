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
      type: new GraphQLList(orgsType),
      resolve: async (parentValue, args, req) => {
        const orgs = await db("users_orgs")
          .where({ user_id: req.user.id })
          .join("orgs", "orgs.id", "=", "users_orgs.org_id");
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
      },
      resolve: async (parentValue, args, req) => {
        const [newOrg] = await db("orgs")
          .insert({
            name: args.name,
            owner_id: req.user.id
          })
          .returning("*");

        // add connection in users_orgs for many to many rel
        await db("users_orgs").insert({
          user_id: req.user.id,
          org_id: Number(newOrg.id)
        });

        return newOrg;
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
        const [updated] = await db("orgs")
          .where({ id: args.id })
          .update(args)
          .returning("*");

        return updated;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
});
