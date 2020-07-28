const { gql } = require("apollo-server");

const userType = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`;

module.exports = {
  userType,
};
