const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const { getOrgs, createOrg, updateOrg } = require("./orgsResolves");
const {
  membersQueryFields,
  membersMutationFields,
} = require("./members/membersSchema.js");

const orgsType = new GraphQLObjectType({
  name: "orgs",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    owner_id: { type: GraphQLInt },
  }),
});

const orgsQueryFields = {
  orgs: {
    type: new GraphQLList(orgsType),
    resolve: getOrgs,
  },
  ...membersQueryFields,
};

const orgsMutationFields = {
  createOrg: {
    type: orgsType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: createOrg,
  },
  updateOrg: {
    type: orgsType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
      owner_id: { type: GraphQLInt },
    },
    resolve: updateOrg,
  },
  ...membersMutationFields,
};

module.exports = {
  orgsQueryFields,
  orgsMutationFields,
};
