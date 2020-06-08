### Solutions for part8

The exercises for part8 are divided into subparts. You can find the solutions for the subparts in their respective directories.

### Excersises part8 library-backend

To start the development backend server run: `cd part8/library-backend` and then `npm run start-server`
To start frontend run: `cd part8/library-frontend` and then `npm start`

Exercises 8.1.-8.7<br/>
Through the exercises, we will implement a GraphQL backend for a small library.

8.1: The number of books and authors <br/>
Implement queries bookCount and authorCount which return the number of books and the number of authors.

8.2: All books <br/>
Implement query allBooks, which returns the details of all books.
In the end, the user should be able to do the following query:

```
query {
  allBooks {
    title
    author
    published
    genres
  }
}
```

8.3: All authors <br />
Implement query allAuthors, which returns the details of all authors. The response should include a field bookCount containing the number of books the author has written.

8.4: Books of an author <br/>
Modify the allBooks query so, that a user can give an optional parameter author. The response should include only books written by that author.

8.5: Books by genre <br />
Modify the query allBooks so that a user can give an optional parameter genre. The response should include only books of that genre. The query must work when both optional parameters are given:

```
query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author
  }
}
```

8.6: Adding a book <br />
Implement mutation addBook, which can be used like this:

```
mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title,
    author
  }
}
```

The mutation works even if the author is not already saved to the server. If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet.

8.7: Updating the birth year of an author <br />
Implement mutation editAuthor, which can be used to set a birth year for an author. The mutation is used like so:

```
mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}
```

If the correct author is found, the operation returns the edited author. If the author is not in the system, null is returned.

Exercises 8.8.-8.12 <br />
Through these exercises we'll implement a frontend for the GraphQL-library.

8.8: Authors view <br/>
Implement an Authors view to show the details of all authors on a page.

8.9: Books view <br/>
Implement a Books view to show on a page all other details of all books except their genres.

8.10: Adding a book <br/>
Implement a possibility to add new books to your application. Make sure that the Authors and Books views are kept up to date after a new book is added.

8.11: Authors birth year <br />
Implement a possibility to set authors birth year. You can create a new view for setting the birth year, or place it on the Authors view. Make sure that the Authors view is kept up to date after setting a birth year.

8.12: Authors birth year advanced <br />
Change the birth year form so that a birth year can be set only for an existing author. Use select-tag, react-select library or some other mechanism.

Exercises 8.13.-8.16 <br />

8.13: Database, part 1 <br />
Change the library application so that it saves the data to a database.
Let's change the book graphql schema a little

```
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
```

so that instead of just the author's name, the book object contains all the details of the author. <br />

You can assume that the user will not try to add faulty books or authors, so you don't have to care about validation errors.
The following things do not have to work just yet

- allBooks query with parameters
- bookCount field of an author object
- author field of a book
- editAuthor mutation

  8.14: Database, part 2 <br />
  Complete the program so that all queries (except allBooks with the parameter author ) and mutations work.

  8.15 Database, part 3 <br />
  Complete the program so that database validation errors (e.g. too short book title or author name) are handled sensibly. This means that they cause UserInputError with a suitable error message to be thrown.

  8.16 user and logging in <br />
  Add user management to your application. Expand the schema like so:

  ```
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }
  ```

type Token {
value: String!
}

type Query {
// ..
me: User
}

type Mutation {
// ...
createUser(
username: String!
favoriteGenre: String!
): User
login(
username: String!
password: String!
): Token
}

```
Create resolvers for query me and the new mutations createUser and login. Like in the course material, you can assume all users have the same hardcoded password.

Make the mutations addBook and editAuthor possible only if the request includes a valid token.


For more info about graphQL library-backend exercises 8.1.-8.7: <br />
https://fullstackopen.com/en/part8/graph_ql_server
For more info about graphQL library-frontend exercises exercises 8.8.-8.12: <br />
https://fullstackopen.com/en/part8/react_and_graph_ql
For more info about database and user administration exercises 8.13.-8.16: <br />
https://fullstackopen.com/en/part8/database_and_user_administration
```
