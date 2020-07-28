require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const DataLoader = require("dataloader");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Author = require("./models/authors");
const User = require("./models/user");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const url = process.env.MONGO_URI;
const JWT_SECRET = process.env.SECRET;

const batchAuthors = async (keys) => {
  const authors = await Author.find({
    _id: {
      $in: keys,
    },
  });

  return keys.map(
    (key) =>
      authors.find((author) => author.id == key) ||
      new Error(`No result for ${key}`)
  );
};

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("Error connecting to db", err.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return {
        currentUser,
        loaders: {
          author: new DataLoader((keys) => batchAuthors(keys)),
        },
      };
    }
    return {
      loaders: {
        author: new DataLoader((keys) => batchAuthors(keys)),
      },
    };
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
