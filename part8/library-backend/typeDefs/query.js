const { gql } = require("apollo-server");

const query = gql`
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }
`;

module.exports = {
  query,
};
