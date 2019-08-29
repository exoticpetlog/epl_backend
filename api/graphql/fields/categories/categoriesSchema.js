const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const {
  getCategories,
  createCategory,
  updateCategory,
} = require("./categoriesResolves");
const { tagsQueryFields, tagsMutationFields } = require("./tags/tagsSchema.js");

const categoriesType = new GraphQLObjectType({
  name: "categories",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    org_id: { type: GraphQLInt },
  }),
});

const categoriesQueryFields = {
  categories: {
    type: new GraphQLList(categoriesType),
    args: {
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: getCategories,
  },
  ...tagsQueryFields,
};

const categoriesMutationFields = {
  createCategory: {
    type: categoriesType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      org_id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: createCategory,
  },
  updateCategory: {
    type: categoriesType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLString },
    },
    resolve: updateCategory,
  },
  ...tagsMutationFields,
};

module.exports = {
  categoriesQueryFields,
  categoriesMutationFields,
};
