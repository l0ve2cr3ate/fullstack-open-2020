const { gql } = require("apollo-server");

const authorType = gql`
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }
`;

module.exports = {
  authorType,
};
