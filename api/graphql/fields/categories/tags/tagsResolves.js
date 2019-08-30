const db = require("../../../../../config/dbConfig.js");
const {
  checkAccess,
  checkOwner,
} = require("../../../authorization/accessHelpers.js");
const { GraphQLError } = require("graphql");

module.exports = {
  getTags: async (parentValue, args, req) => {},

  addTag: async (parentValue, args, req) => {},

  removeTag: async (parentValue, args, req) => {},
};
