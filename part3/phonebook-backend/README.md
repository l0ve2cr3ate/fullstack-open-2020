Your node version should be at least v10.18.0 (check with node -v)

### Solutions for part3 phonebook-backend.

In order to start the server, run the command: `npm start`
To run the server in development mode, runt the command: `npm run dev`

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

For more info about the exercises for part3 phonebook-backend: https://fullstackopen.com/en/part3/node_js_and_express and https://fullstackopen.com/en/part3/deploying_app_to_internet
