### Solutions for part2 phonebook.

In order to run the code, run the following 2 commands:
`npm start` (for the front-end)  
`npm run server` (for the data fetching from json-server)

Exercises of part2 are divided in subparts. You can find the solutions for every subpart in their respective folder.

### Exercise part2 phonebook

Let's create a simple phonebook. In this part we will be adding names to the phonebook.
Prevent the user from being able to add names that already exist in the phonebook. Issue a warning with the alert command when such an action is attempted.
Expand your application by allowing users to add phone numbers to the phone book.
Implement a search field that can be used to filter the list of people by name.
Store the initial state of the application in the file db.json. Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an Effect hook.

More info about the exercises can be found here: https://fullstackopen.com/en/part2/forms and https://fullstackopen.com/en/part2/getting_data_from_server

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
