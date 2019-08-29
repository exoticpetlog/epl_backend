const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const { getMembers, addMember, removeMember } = require("./membersResolves");

const membersType = new GraphQLObjectType({
  name: "members",
  fields: () => ({
    org_id: { type: GraphQLInt },
    username: { type: GraphQLString },
    user_id: { type: GraphQLInt },
    email: { type: GraphQLString }
  })
});

const membersQueryFields = {
  members: {
    type: new GraphQLList(membersType),
    args: {
      org_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: getMembers
  }
};

const membersMutationFields = {
  addMember: {
    type: membersType,
    args: {
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
      username: { type: GraphQLString },
      email: { type: GraphQLString }
    },
    resolve: addMember
  },
  removeMember: {
    type: membersType,
    args: {
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
      user_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: removeMember
  }
};

module.exports = {
  membersQueryFields,
  membersMutationFields
};
