const { GraphQLInt, GraphQLList, GraphQLNonNull } = require("graphql");

const { getByTag, addTag, removeTag } = require("./membersResolves");
const { animalsType } = require("../../animals/animalsSchema");

const tagsQueryFields = {
  animalsByTag: {
    type: new GraphQLList(animalsType),
    args: {
      category_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: getByTag,
  },
};

const tagsMutationFields = {
  addTag: {
    type: animalsType,
    args: {
      animal_id: { type: new GraphQLNonNull(GraphQLInt) },
      tag_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: addTag,
  },
  removeTag: {
    type: animalsType,
    args: {
      animal_id: { type: new GraphQLNonNull(GraphQLInt) },
      tag_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: removeTag,
  },
};

module.exports = {
  tagsQueryFields,
  tagsMutationFields,
};
