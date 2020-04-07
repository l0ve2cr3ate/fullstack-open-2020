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

For more info about the exercises for part4 4.1-4.7 blog-list: https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing
More info about exercises part4 4.8-4.12 blog-list test can be found: https://fullstackopen.com/en/part4/testing_the_backend

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
