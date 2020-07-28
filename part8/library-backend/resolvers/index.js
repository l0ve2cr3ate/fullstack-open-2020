const Book = require("../models/books");
const Author = require("../models/authors");
const User = require("../models/user");
const {
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");

const jwt = require("jsonwebtoken");

const pubsub = new PubSub();
const JWT_SECRET = process.env.SECRET;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });

        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author");

        return books;
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });

        const books = await Book.find({ author: { $in: author.id } }).populate(
          "author"
        );

        return books;
      } else if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          "author"
        );

        return books;
      } else {
        return Book.find({}).populate("author");
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});

      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author.id,
        };
      });

      return authorsObject;
    },
  },
  Book: {
    author: async (root, args, { loaders }) => {
      const id = root.author;

      const author = await loaders.author.load(root.author._id);

      return {
        name: author.name,
        born: author.born,
        bookCount: author.books.length,
        id: root.author._id,
      };
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      let book;
      try {
        // Check if book author is already in db:
        let author = await Author.findOne({ name: args.author });

        const currentUser = context.currentUser;

        if (!currentUser) {
          throw new AuthenticationError("not authenticated");
        }

        if (author) {
          book = new Book({ ...args, author: author._id });
          author.books = author.books.concat(book._id);

          await book.save();
          await author.save();
        }

        if (!author) {
          const _id = mongoose.Types.ObjectId();
          book = new Book({ ...args, author: _id });

          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
            _id,
            books: [book._id],
          });

          await author.save();
          await book.save();
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = {
  resolvers,
};
