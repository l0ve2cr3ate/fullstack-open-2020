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

For more info about the exercises for part4 blog-list: https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing

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
