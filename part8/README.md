### Solutions for part8

### Excersises part8 library-backend

To start the development server run: `cd part8/library-backend` and then `npm run start-server`

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
