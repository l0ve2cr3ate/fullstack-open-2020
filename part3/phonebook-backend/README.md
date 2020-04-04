Your node version should be at least v10.18.0 (check with node -v)

### Solutions for part3 phonebook-backend.

In order to start the server locally, run the command: `npm start`  
To run the server locally in development mode, run the command: `npm run dev`

#### Deployed server/app

You can find the deployed server (with frontend) here: https://phonebook-backend-2020.herokuapp.com/

If you want to deploy a subdirectory to heroku you can use the following commands (don't forget to commit
your code first) from the root directory:
`npm install -g heroku`
`heroku login`
`heroku git:remote -a phonebook-backend-2020` (where phonebook-backend-2020 is the name of your heroku app)
`heroku config:set MONGO_URI=hereyourmongouri`
`git subtree push --prefix part3/phonebook-backend heroku master` (where part3/phonebook-backend is path/to/subdirectory)

You can find more info about it here:
https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f

Command to copy frontend build directory to phonebook-backend
`cd part2/phonebook`
`cp -r build ../../part3/phonebook-backend`
or in part3/phonebook-backend run the command
`npm run build:ui`

### Exercises part3 phonebook-backend

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

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas. You use the program by passing three command-line arguments (the first is the password, the 2nd the name and the 3rd the number). The app will response by printing: added {name} {number} to phonebook, and storing the data to the db. When only the password is given as an argument the program should display all of the entries in the phonebook.

Change the fetching of all phonebook entries so that the data is fetched from the database.
Change the backend so that new numbers are saved to the database.
Change the backend so that deleting phonebook entries is reflected in the database.
Move the error handling of the application to a new error handler middleware.
If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL. Modify the backend to support this request.
Also update the handling of the api/persons/:id and info routes to use the database.

Add validation to your application, that will make sure that you can only add one number for a person in the phonebook. If an HTTP POST request tries to add a name that is already in the phonebook, the server must respond with an appropriate status code and error message.
Expand the validation so that the name stored in the database has to be at least three characters long, and the phone number must have at least 8 digits.
Expand the frontend so that it displays some form of error message when a validation error occurs.
Generate a new "full stack" version of the application and deploy it to Heroku again.

Add ESlint to your application and fix all the warnings.

For more info about the exercises for part3 phonebook-backend: https://fullstackopen.com/en/part3/node_js_and_express and https://fullstackopen.com/en/part3/deploying_app_to_internet and https://fullstackopen.com/en/part3/saving_data_to_mongo_db and https://fullstackopen.com/en/part3/validation_and_es_lint

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

### Notes part3 Deploying app to the internet

**Same origin policy and CORS**
_Cross origin resource sharing_ (CORS) = a mechanism that allows restricted resources on a webpage to be requested from another domain. Certain cross-domain requests are forbidden by default by the same-origin security policy. To allow requests from other origins you need to use CORS middleware.

**Serving static files from the backend**
To deploy the frontend one van copy the production build to the root of the backend directory and configure the backend to show the frontend's main page using `app.use(express.static('build'))`

### Notes part3 Saving data to MongoDB

MongoDB is a _document-database_, which are categorized under NoSQL db's.
MongoDB stores _documents_ in _collections_, which are analogous to tables in relational db's.
Data is stored as BSON objects, a binary representation of JSON documents.
Mongoose is a _object document mapper_ which helps saving JS objects as Mongo documents.

A _Schema_ maps to a MongoDB collection and defines the shape of documents within the collection. It tells Mongo how to store data. _Models_ are constructors compiled from Schema definitions. An instance of a model is called a _document_. Models are responsible for creating and reading documents.
Document-db's are _schemaless_: the db itself does not care about the structure of the data that is stored.

Save data --> `.save()`
Search data --> `.find()`

**Error Handling**
We need to catch failed promises with `.catch()`, so requests to /api/notes/wrongid are handled correctly.
There can be 2 kinds of errors:

- id is not in correct Mongo Id format
- id is not found in db

The first error we catch:

```
.catch(err => {
    console.error(err)
    res.status(400).send({error: 'malformatted id'})
})
```

Last error we can fix by checking if Mongo returns a document:

```
if(note) ...
else {
    res.status(404).end()
}
```

**Moving errorhandling into middleware**
`.catch(error => next(error))` --> passes error to errorhandling middleware.

**The order of middleware**
Order matters, middleware is executed in order that they are loaded into express by `app.use()`

**Other Operations**
.findByIdAndRemove --> to remove data from db
.findByIdAndUpdate --> to edit data --> By default the event handler receives the original document,
without modifications! --> Add `{new: true}` parameter to get the modified document.

### Notes Part3 Validation and ESLint

Mongoose can validate the format of data before it is stored. Add validation rules, like `{required: true, minlength: 3}` to model. mongoose-unique-validator package can be used to check for unique entries.
