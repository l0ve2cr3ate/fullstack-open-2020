### Solutions for part8

The exercises for part8 are divided into subparts. You can find the solutions for the subparts in their respective directories.

### Excersises part8 library-backend

To start the development backend server run: `cd part8/library-backend` and then `npm run start-server` <br/>
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
    <br/>

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

type Token {
value: String!
}

type Query {
  //..
me: User
}

type Mutation {
  //..
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

Make the mutations addBook and editAuthor possible only if the request includes a valid token. <br />

Exercises 8.17.-8.22 <br />
8.17 Listing books <br/>
After the backend changes the list of books does not work anymore. Fix it.

8.18 Log in <br />
Adding new books and changing the birth year of an author do not work because they require user to be logged in.

Implement login functionality and fix the mutations.

It is not necessary yet to handle validation errors.

When a user is logged in, the navigation changes to show the functionalities which can only be done by a logged in user, like add book.

8.19 Books by genre, part 1 <br />
Complete your application to filter the book list by genre. In this exercise the filtering can be done using just React.

8.20 Books by genre, part 2 <br />
Implement a view which shows all the books based on the logged in user's favourite genre.

8.21 books by genre with GraphQL
In the previous exercise 8.20, the filtering could have been done using just React. To complete this exercise, you should filter the books in the recommendations page using a GraphQL query to the server. The query created in exercise 8.5 could be useful here.

8.22 Up to date cache and book recommendations
If you fetch the book recommendations with GraphQL, ensure somehow that the books view is kept up to date. So when a new book is added, the books view is updated at least when a genre selection button is pressed.

When new genre selection is not done, the view does not have to be updated.

Exercises 8.23.-8.26 <br />
8.23: Subscriptions - server <br />
Do a backend implementation for subscription bookAdded, which returns the details of all new books to its subscribers.

8.24: Subscriptions - client, part 1 <br />
Start using subscriptions in the client, and subscribe to bookAdded. When new books are added, notify the user. Any method works. For example, you can use the window.alert function.

8.25: Subscriptions - client, part 2 <br />
Keep the application's view updated when the server notifies about new books.

8.26: n+1
Solve the n+1 problem of the following query using any method you like

```query {
  allAuthors {
  name
  bookCount
  }
}
```

### Notes part 8: GraphQL

#### a. GraphQL-server

REST is _resource based_. Every resource had its own address (`/users/10`).
Operations are done with HTTP requests to the resource's URL. Sometimes you need to do multiple requests to combine data from different resources. This will also return a lot of unnecessary data. GraphQL can handle these kind of situations better.

**Main principle of graphQL**: code on browser forms a _query_ describing wanted data + send it to API with HTTP POST request. All queries in graphQL are sent to same address, and their type is POST.

**Schemas and Queries** <br />
_Schema_: describes data sent between server and client.
Example:

```
type Person {
  name: String!
  phone: String
  street: String!
  city: String!
  id: ID!
}
```

graphQl has five _scalar_ types:

- Int (32-bit integer)
- Float (signed double-precision floating point value)
- String (UTF-8 character-seq)
- Boolean (true or false)
- ID: unique identifier

exclamation mark means field is required/non-null.

Query schema type defines what queries client can send to server, what params the queries can have and what kind of data they return. A query can return any field described in the schema.

**Apollo Server** <br />
_typeDefs_: contains graphQL schema.
_resolvers_: code which defines how graphQL queries are responded to, and correspond to queries and mutations described in schema.

**Parameters of resolver** <br>
Resolvers can have four parameters: obj, args, context and info.

- _Obj_: result returned from resolver of the parent field
- _Args_: contains the parameters of the query
- _Context_: object shared with all resolvers in a particular query
- _Info_: contains info about execution state of query

**The default resolver** <br>
A GraphQl server must define resolvers for _each_ field of each type in the schema. If you don't define resolvers for field, Apollo defines _default resolvers_ for them:

```
Person : {
  name: (root) => root.name
}
```

**Object within an object** <br>

```
type Address {
  street: String!
  city: String!
}

type Person {
  name: String!
  phone: String
  address: Address!
  id: ID!
}
```

Objects saved in the Person array on the server don't have the field _address_, so default resolver is not enough.

```
Person: {
  address: (root) => {
    return {
      street: root.street,
      city: root.city
    }
  }
}
```

name, phone, and id are returned by their default resolvers, and the address is formed by the self defined resolver. The _root_ parameter is the person-object.

**Mutations** <br>
In GraphQL operations which cause a change are done with mutations. Mutations also require resolvers.

**Error handling** <br>
If you try to perform a mutation with the wrong parameters, the server gives an error. GraphQL validation handles this error, but GraphQL also has an error handling mechanism. _UserInputError_ from `apollo-server` let's you throw errors.

**Enum** <br>
Enumaration types are a special kind of scalar, restricted to a particular set of allowed values.

**More on queries** <br>
It's possible to combine multiple field of type Query/separate queries into one query. Combined query can use the same query multiple times if you give alternative names:

```
query {
  havePhone: allPersons(phone: YES) {
    name
  }
  phoneless: allPersons(phone: NO) {
    name
  }
}
```

You can name your queries: `query nameQuery {}`

#### b. React and GraphQL

**Apollo Client** <br>
The app can communicate with GraphQL server using a _client_ object. By wrapping the App component of the React app in `ApolloProvider` the client will be accessible for all components.

**Making queries** <br>

```
const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`
```

in the App component:

```
const result = useQuery(ALL_PERSONS)
```

`useQuery` returns an object with properties loading (query has not jet received response), data (response has been received) and error.

**Named queries and variables** <br>

```
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    //...
  }
}
```

`useQuery` hook --> for situations where query is done when component is rendered. If you want to make a query only when a user wants to see specific data, and the query needs to be done only as required `useLazyQuery` is a good option.

**Cache** <br>
Query to backend is done only the 1st time. Apollo Client saves responses of queries to cache. If a query is in cache, it's not sent the the server.

**Doing Mutations** <br>
For mutations `useMutation` hook can be used. Apollo Client can't automatically update the cache of the app, so after a mutation, it still contains the state from before the mutation. You could update the screen by reloading the page, since this empties the cache, but it's not a good solution.

**Updating the Cache** <br>

1. Make the query poll the server/make the query repeatedly:

```
const result = useQuery(ALL_PERSONS, {
  pollInterval: 2000
})
```

_Advantage:_ <br>
Simple solution, every time a user adds a new person, it immediately appears on the screens of all users. <br>
_Disadvantage:_ <br>
pointless web-traffic

2. use `useMutation` _refetchQueries_ parameter to define that a query is done again after the mutation:

```
const [createPerson] = useMutation(CREATE_PERSON, {
  refetchQueries: [{query: ALL_PERSONS}]
})
```

_Advantage:_ <br>
No extra web-traffic <br>
_Disadvantage:_ <br>
If one user updates the state of the server, the changes don't show to other users immediately. <br>

**Handling mutation errors** <br>
We can register an error handler function to the mutation using `useMutations` _onError_ option:

```
onError: (error) => {
    setError(error.graphQLErrors[0].message)
}
```

When you update details of something in the cache which has an id, the cache will automatically update.

**Apollo Client and the app state** <br>
When using Apollo, state management libraries like Redux are not needed anymore most of the time.

#### c. Database and user administration

**Mongoose and Apollo**
In Mongo the identifying field if an object is called \_id and before the name of the field needed to be parsed to id. GraphQL can do it automatically. When using Mongoose with Mongo, resolvers contain code like:

```
const Person = await Person.findOne(name: args.name)
```

So the resolvers now return a promise instead of an object. Apollo sends back het value the promise resolves to.

**Validation**
Input is validated using validations defined in mongoose-schema. For handling validation errors in the schema, you will need to add a try catch block to the save method.

**User and Login**
You can add _context_ to new AppoloServer. The object returned by context is given to all resolvers as their third param --> great for user identification.

#### d. Login and updating the Cache

**User login (frontend)**
Store token in application state when user is logged in. If token is undefined, render LoginForm. To login, you need to define a login mutation, and add to token to local storage. The user needs a button so he/she will be able to logout. This logout action will need to reset the token to null, remove the token from localStorage and **reset Apollo Cache**. The cache can be reset using Apollo client _resetStore_ method: `client.resetStore()`. The client can be accessed by `useApolloClient` hook: `const client = useApolloClient()`.

**Adding a token to a header**
Tokens needs to be send to the backend to be able to add a new book and edit the author.

```
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token)

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({uri: 'http://localhost:4000'})
const client = new ApolloClient({
  cache: new InMemoryCache()
  link: authLink.concat(httpLink)
})
```

`apollo-link-context` needs to be installed. The _link_ parameter of client defines how Apollo connects to the server.

**Updating cache, revisited**
Cache can be updated by update callback for mutation. The callback function is given a reference to the cache, and the data returned by mutation as params. It is also possible to disable cache for whole app or single query, by setting `fetchPolicy` to `no-cache`.
Old data in the cache can cause hard to find bugs. Keeping the cache up to date is challenging.

#### e. Fragments and subscriptions

**Fragments**
Some queries returns the same results. To prevent code repetition _fragments_ can be used:

```
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    phone
    address {
      street
      city
    }
  }
`
```

The query now looks like:

```
const ALL_PERONS = `gql
  query {
    allPersons {
      ...PersonDetails
    }
  }
   ${PERSON_DETAILS}
`
```

and

```
query {
  allPersons {
    ...PersonDetails
  }
}
```

Fragments are not defined in graphQL schema, but in the client.

**Subscriptions:**
Let the client _subscribe_ to update about changes in the server. After the app has made a subscription it starts to listen to the server. When changes occur on the server, it sends a notification to its _subscribers_. HTTP-protocol is not suited for communication from server to client. Apollo uses WebSocekts under the hood for server-subscription communication.

**Subscriptions on the Server**

```
type SubScription {
  personAdded Person!
}
```

personAdded resolver:

```
const {PubSub} = require('apollo-server')
const pubsub = new PubSub()

Subscription: {
  personAdded: {
    subscribe: () => pubsub.asyncIterator([PERSON_ADDED])
  }
}
```

addPerson resolver needs to be updated:
`pubsub.publish('PERSON_ADDED', {personAdded: person})`

Communication happens using **publish-subscribe** principle. Adding a new person _publishes_.

**Subscriptions on the Client**
To use subscriptions on the frontend additional config is needed. `WebSocketLink` needs to be created + `splitLink` is needed for creating the link. Needed packages: `@apollo/link-ws subscriptions-transport-ws`
There needs to be a HTTP connection + a WebSocket connection to the graphQL server. For subscriptions you can use `useSubscription` hook:

```
useSubscription(PERSON_ADDED, {
  onSubscriptionData: ({subscriptionData}) => {
    //...
  }
})
```

When a new person is added the server sends a notification to the client, and callback function defined in `onSubscriptionData` attribute is called --> add person to Apollo cache, check if not already there:

```
const updateCacheWith = (addedPerson) => {
  const includedIn = (set, object) =>
    set.map(p => p.id).includes(object.id)

  const dataInStore = client.readQuery({
    query: ALL_PERSONS
  })
  if(!includedIn(dataInStore.allPersons, addedPerson)) {
    client.writeQuery({
      query: ALL_PERSONS,
      data: {allPersons: dataInStore.allPersons.concat(addedPerson)}
    })
  }
}
```

--> call `updateCacheWith(addedPerson)` in `onSubscriptionData` + `update` attribute of createPerson mutation.

**n+1 problem:**
performance anti-pattern in which an app make N + 1 database calls (N = number of objects fetched).
Good solutions for n+1 problem depend on situation. Often it requires using a _join_ query instead of multiple separate queries.
The 4th parameter of the resolver, _info_ can be used to optimize queries, for example if n+1 problem happens only sometimes. `Dataloader` offers a good solution for the n+1 problem.

Note:

To log mongoose queries:

```javascript
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
```

For more info about graphQL library-backend exercises 8.1.-8.7: <br />
https://fullstackopen.com/en/part8/graph_ql_server <br/>
For more info about graphQL library-frontend exercises exercises 8.8.-8.12: <br />
https://fullstackopen.com/en/part8/react_and_graph_ql <br/>
For more info about database and user administration exercises 8.13.-8.16: <br />
https://fullstackopen.com/en/part8/database_and_user_administration <br/>
For more info about login and updating cache exercises 8.17.-8.22: <br/>
https://fullstackopen.com/en/part8/login_and_updating_the_cache <br/>
For more info about fragments and subscriptions exercises 8.23-8.26: <br />
https://fullstackopen.com/en/part8/fragments_and_subscriptions <br />
