Your node version should be at least v10.18.0 (check with node -v)

### Solutions for part3 phonebook-backend.

In order to start the server locally, run the command: `npm start`
To run the server locally in development mode, runt the command: `npm run dev`

#### Deployed server

You can find the deployed server here: https://phonebook-backend-2020.herokuapp.com/api/persons

If you want to deploy a subdirectory to heroku you can use the following commands:
`npm install -g heroku`
`heroku login`
`heroku git:remote -a phonebook-backend-2020` (where phonebook-backend-2020 is the name of your heroku app)
`git subtree push --prefix part3/phonebook-backend heroku master` (where part3/phonebook-backend is path/to/subdirectory)

You can find more info about it here:
https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f

Command to copy frontend build directory to phonebook-backend
`cd part2/phonebook`
`cp -r build ../../part3/phonebook-backend`

### Exercise part3 phonebook-backend

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons  
Implement a page at the address http://localhost:3001/info. The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.  
Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5. If an entry for the given id is not found, the server has to respond with the appropriate status code.  
Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons. Generate a new id for the phonebook entry with the Math.random function.
Implement error handling for creating new entries. The request is not allowed to succeed, if:

- The name or number is missing
- The name already exists in the phonebook

Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the _tiny_ configuration.
Configure morgan so that it also shows the data sent in HTTP POST requests.

Make the backend work with the frontend from the previous part.
Deploy the backend to the internet, for example to Heroku.
Generate a production build of your frontend, and add it to the internet application.
Also make sure that the frontend still works locally.

For more info about the exercises for part3 phonebook-backend: https://fullstackopen.com/en/part3/node_js_and_express and https://fullstackopen.com/en/part3/deploying_app_to_internet

### Notes part3 Node.js and Express

Code that runs in the browser uses ES6 modules (with export/import syntax). Nodejs uses CommonJS modules (from version 13.2.0 Node ships with support of ES6 modules, however implementation remains experimental).

**REST**: Representational State Transfer = architectural style for building scalable web apps.
Convention: create unique address (url) for resources by combining name of resource type with resource's unique identifier: api/notes/10.

**Fetching a single resource**
--> parameters for routes in express are defined using colon syntax:
`api/notes/:id`
The id parameter in the route of a request can be accessed through the request object:
`const {id} = req.params`

**HTTP Status Codes:**
200: succeeded
404: not found
204: no content (for example for successful delete operations)

**HTTP request types**
GET and HEAD methods should be safe. This means that the request should not cause any _side-effects_ on the server --> the state of the db should not change as a result of the request, and the response should only return data that already exists on the server.
HEAD should work like GET, but does only return status code and response headers, no response body.

All HTTP requests except POST should be _idempotent_: the _side-effects_ of N > 0 identical requests is the same as for a single request. In other words: if a request has side-effects, the result should be the same, regardless of how many times the request is sent.

Safety and idempotence are recommandations, not (built-in) properties of requests.

**Middleware**
--> functions that can be used for handling req and res objects, like json-parser. You can use serveral middleware at the same time. They are executed one by one, in the order that they are taken into use by express.
You use middleware like this:
`app.use(middlewareName)`
If you want your middleware functions to be executed before the route event handlers are called, you need to put them above your routes.
