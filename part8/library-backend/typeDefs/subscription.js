const { gql } = require("apollo-server");

const subscription = gql`
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = {
  subscription,
};
