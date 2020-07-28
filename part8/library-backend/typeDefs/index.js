const { query } = require("./query");
const { mutation } = require("./mutation");
const { subscription } = require("./subscription");
const { bookType, userType, authorType } = require("./types");

const typeDefs = [
  query,
  mutation,
  subscription,
  bookType,
  userType,
  authorType,
];

module.exports = {
  typeDefs,
};
