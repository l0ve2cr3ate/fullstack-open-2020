### Solutions for part4 blog-list.

In order to start the server locally, run the command: `npm start`  
To run the server locally in development mode, run the command: `npm run dev`

### Exercises part4 blog-list

Exercises 4.1-4.2  
As part of the exercises for part4 we create a simple blog-list app (starting with some provided starter code).
We refactor the code into separate modules.

Exercises 4.3.-4.7  
Create a collection of helper functions that are meant to assist dealing with the blog list.  
4.3: helper functions and unit tests, step1  
Define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.
Verify that your test config works.  
4.4: helper functions and unit tests, step2  
Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts. Write appropriate tests for the function.
4.5: helper functions and unit tests, step3  
Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes.
4.6: helper functions and unit tests, step4  
Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs.  
4.7: helper functions and unit tests, step5  
Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes.

Exercises 4.8.-4.12  
4.8: Blog list tests, step1  
Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url.
Refactor the route handler to use the async/await syntax instead of promises.  
4.9: Blog list tests, step2  
Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property \_id.  
4.10: Blog list tests, step3  
Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post. Once the test is finished, refactor the operation to use async/await instead of promises.  
4.11: Blog list tests, step4  
Write a test that verifies that if the likes property is missing from the request, it will default to the value 0.  
4.12: Blog list tests, step5  
Write a test related to creating new blogs via the /api/blogs endpoint, that verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.

Exercises 4.13.-4.14  
4.13 Blog list expansions, step1  
Implement functionality for deleting a single blog post resource. Use the async/await syntax.  
4.14 Blog list expansions, step2  
Implement functionality for updating the information of an individual blog post. Use async/await. The application mostly needs to update the amount of likes for a blog post.

Exercises 4.15.-4.22  
4.15: bloglist expansion, step4  
Implement a way to create new users by doing a HTTP POST-request to address api/users. Users have username , password and name. Implement a way to see the details of all users by doing a suitable HTTP request.  
4.16: bloglist expansion, step5  
Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.
The operation must respond with a suitable status code and some kind of an error message if invalid user is created. Implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.  
4.17: bloglist expansion, step6  
Expand blogs so that each blog contains information on the creator of the blog. Modify adding new blogs so that when a new blog is created, any user from the database is designated as its creator. Modify listing all blogs so that the creator's user information is displayed with the blog, and listing all users also displays the blogs created by each user.  
4.18: bloglist expansion, step7  
Implement token-based authentication.  
4.19: bloglist expansion, step8  
Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request.
4.20: bloglist expansion, step9  
Refactort getToken function to taking the token to a middleware. The middleware should take the token from the Authorization header and place it to the token field of the request object.  
4.21: bloglist expansion, step10  
Change the delete blog operation so that a blog can be deleted only by the user who added the blog.  
4.22: bloglist expansion, step11  
After adding token based authentication the tests for adding a new blog broke. Fix the tests.

For more info about the exercises for part4 4.1-4.7 blog-list: https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing  
More info about exercises part4 4.8-4.14 blog-list tests and blog-list expansion can be found: https://fullstackopen.com/en/part4/testing_the_backend  
More info about part4 exercises 4.15-4.22 blog-list expansion can be found: https://fullstackopen.com/en/part4/token_authentication

### Notes part4: Testing Express Servers, user administration

### a. Structure of backend app, intro to testing

**Project Structure**
It is good practice to separate different parts of your code into different modules:
Move printing of console statements to separate logging module which will print normal and error messages.
Extract handling of environment variables into separate config module. Extract route handlers to separate module in controllers directory. Move middleware into a separate module.

When extracting the route handlers into a separate module, one can create a _router object_:
`const noteRouter = require('express').Router()`. A _router object_ is an isolated instance of middleware and routes. The router is a middleware that can be used to create related routes.
Use it like: `app.use('/api/notes', notesRouter)` --> if a req starts with `/api/notes`, this router will be used. The paths in the routes handler are shorter now:
`notesRouter.delete('/:id', (req, res) => {})` instead of `/api/notes/:id`

**Test Node App**
Jest requires you to specify the execution environment --> add to package.json `"jest": { testEnvironment: "node"}` or add it to jest.config.js: `module.exports = { testEnvironment: "node"}`
In eslint add `"jest": true`
Describe blocks can be used for grouping of test into logical collections.
You can run a single test with _only_ method, or by specifying the name of the test with a -t flag.

toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual instead.

### b. Testing the backend

Sometimes it can be useful to mock db when testing --> mongo-mock. If you use db for testing, use separate test db.
_Integration testing_: test multiple components of a system as a group.
Use a test environment for your tests --> NODE-ENV=test (use cross-env)
`runInBand` prevents Jest from running tests in parallel.
_supertest_ --> to test API

**Initializing db before tests**  
Tests should NOT depend on state of db --> reset db and generate test data in controlled manner before running tests --> use `beforeEach`

**Async await**  
--> in order to use await with async operations, they need to return a promise.
--> await can only be used inside _async_ function.

**Error-handling and async-await**  
--> use try/catch
--> express-async-errors eliminates need for writing try/catch blocks --> if an exception occurs in async route, error is automatically passed to error handling middleware.

**Optimizing beforeEach function**  
If you have an async `forEach` in your `beforeEach`, `beforeEach` won't wait for `forEach` to finish executing. Await commands in `forEach` are not in `beforeEach` function, but in separate functions, that `beforeEach` won't wait for. Fix --> use `promise.all` to wait for all async operations to be finished.
`promise.all` transforms array of promises into a single promise that is fulfilled once every promise in the array is resolved. --> executes promises in parallel. If promises need to be executed in particular order, use `for...of`.

Jest `toContain` method --> uses Object.is --> not suited for matching objects. To match objects in array use `toContainEqual` matcher.

### c. User Administration

1 to many relationship between User and Note: 1 user can have many notes.
In a _relational db_ both resources would have separate tables, and the id ot the user who created a note would be stored in the notes table as _foreign key_.
In _document db's_ there are many different ways of modeling the situation.
At the moment, notes are saved in notes collection. If we don't want to change this collection, users could be saved in users collection.
ObjectId's can be used to reference documents in other collections, similar to foreign keys in relational db's. Document db's don't support _join queries_ like relational db's, for aggregating data from multiple tables.  
**References across collections**  
In a relational db the note would have a _reference key_ to the user who created it. In a document db, you can also do this. But _document db's_ don't demand foreign key to be stored in note resources. It could also be stored in users collection, or both. Also possible: nest entire notes array as part of users collection.

Only store hashedPassword in db!

**Populate**  
When HTTP get request is made to /api/users we would like the user object to also contain content of user's notes, not only their id's. In relational db's one would use a _join query_. Mongoose can do a _join_ by doing multiple queries. _Join queries_ in relational db's are _transactional_ --> state of db doesn't change during time query is made. Mongoose join is not transactional, state can change during the query. Mongoose join is done with _populate_.

### d. Token Authentication

Flow:

- user logs in with login form
- username & password are send to server in POST request to api/login
- if correct --> server generates token
- backend responds with status code indicating successful operation + returns token in response
- browser saves token
- when user performs operation that needs identification, token is send to server with request
- server uses token to identify user

status 401: unauthorized --> if user is not found or password or token are incorrect.
To send token from browser to server --> use Authorization headers.

**Error handling**
Token verification (with jsonwebtoken) can cause JsonWebTokenError. Token can be faulty, falsified or expired.

If app has multiple interfaces requiring identification --> extract JWT validation into middelware or use express-jwt.
