const { gql } = require("apollo-server");

const bookType = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
`;

module.exports = {
  bookType,
};
