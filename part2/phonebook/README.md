### Solutions for part2 phonebook.

In order to run the code, run the following 2 commands:
`npm start` (for the front-end)
`cd part3/phonebook-backend`
`npm run dev` (to start back-end)

You can find the deployed app here: https://phonebook-backend-2020.herokuapp.com/

**Note**
If you want to run the app using json webserver instead of the phonebook backend, you should change the baseUrl in the `services` folder to `http://localhost:3001/api/persons`, and start jsonwebserver with `npm run server` command.

Exercises of part2 are divided in subparts. You can find the solutions for every subpart in their respective folder.

### Exercise part2 phonebook

Let's create a simple phonebook. In this part we will be adding names to the phonebook.
Prevent the user from being able to add names that already exist in the phonebook. Issue a warning with the alert command when such an action is attempted.
Expand your application by allowing users to add phone numbers to the phone book.
Implement a search field that can be used to filter the list of people by name.
Store the initial state of the application in the file db.json. Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.

Currently the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.
Extract the code that handles the communication with the backend into its own module.
Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method.
Change the functionality so that if a number is added to an already existing user, the new number will replace the old number.

Show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed).
Open your application in two browsers. If you delete a person in browser 1 a short while before attempting to change the person's phone number in browser 2, you will get an error message in the console. Show the user a message when the operation does not succeed.

More info about the exercises can be found here: https://fullstackopen.com/en/part2/forms and https://fullstackopen.com/en/part2/getting_data_from_server and https://fullstackopen.com/en/part2/altering_data_in_server and https://fullstackopen.com/en/part2/adding_styles_to_react_app

### Notes part2 Getting data from the server

**The browser as runtime environment**
js engines or runtime environments follow asynchronous model. This requires (most) IO-operations to be executed as non-blocking. After async operation is completed, the js engine calls the event handlers registered to the operation. js engines are _single-threaded_. They can't execute code in parallel. If execution of IO-operations would be blocking, the browser would freeze during operations like data fetching.
Because js is single threaded, computations can't take too long, otherwise the browser can't respond to user interactions.
With web-workers it's possible to run parallelized code, but the event loop of an individual browser window is still handled by a single thread.

**Event loop**
js has 1 thread == 1 call stack == one thing at a time.
_Concurrency and the event loop:_ One thing at a time, except not really -> the browser is more than just runtime. It also has webapis + event loop. The job of the event look is to look at the stack and the task queue. If the stack is empty, the event loop takes the 1st callback of the queue and pushes it to the stack.

**Promises**
A _promise_ is an object representing the eventual completion/failure of an async operation. It can have 3 distinct states.

1. pending: final value isn't available yet.
2. fulfilled/resolved -> succesful operation.
3. rejected -> failed operation.

To access the result of the operation represented by the promise, an event handler must be registered to the promise, via the _then_ method:

```
promise.then(response => console.log(response))
```

**Effect-hooks**
_useEffect_ lets you perform side effects, like data fetching, in functional components.
It takes 2 parameters:

1. a function, the effect
2. dependencies array -> determines when effect is run.
   By default effects run after every completed render.

### Notes part2 Altering data on the server

**REST**
Individual data objects in REST are called _resources_.
Every _resource_ has a unique address, its url.
HTTP PUT: _replace_ resource
HTTP PATCH: change some of the resource properties.

**Promises and errors**
`.catch` can be used to handle promise rejection.

```
.then().catch(error => console.log(error))
```

If you place a `.catch` at the end of a _promise chain_, it will be called once any promise in the chain throws an error and the promise becomes rejected.
