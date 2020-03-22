### Solutions for part1 unicafe.

Part 1 exercises are subdivided into three parts: courseinfo, unicafe and anecdotes.
You can find the solutions for each sub-part into their respective folders.

### Exercise part1 unicafe

Unicafe collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.
The application must display the total number of collected feedback for each category.
The application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

More info about the exercises can be found here: https://fullstackopen.com/en/part1/introduction_to_react

### Notes for part1 unicafe

#### Event Handlers

-> are called when a specific event, like click, occurs.  
-> should be a function or a function reference.

```
<button onClick={setCounter(counter + 1)} />
```

-> Above code will cause error: Too many re-renders. The event handler is a _function call_.
The event handler gets assigned the return value of the function. Counter starts at 0.  
First render: setCounter(0 + 1) -> changes component state to 1 -> component re-renders -> setCounter call
will be executed again, etc.

```
<button onClick={() => setCounter(counter + 1)} />
```

-> now setCounter function will only be called when the user clicks the button.  
When the component gets rendered, no function gets called, only the reference to the arrow function is set to the event handler.

Another way to define an event hanler is to use a function that returns a function.

```
const hello = () => {
    return () => console.log('hello)
}

<button onClick={hello()} />
```

In the exampe above the event handler is set to a _function call_. When the component gets rendered the hello function gets executed, and returns a function. The return value of hello() gets assigned to the onClick attribute. Since the hello function returns a function, the event handler is now a function.
**Why use it**
Functions returning functions can be utilized in defining generic functionality, that can be customized with parameters. You can think of such a function as a _factory_ that created customized event handlers.

#### State

Don't mutate state directly in React. Use methods like concat instead of push. Concat creates a new copy of the array, while push mutates the existing array.

#### Rules of Hooks

Don't call useState and useEffect from inside a loop, a conditional expression or any place that's not a function defining a component -> this ensures hooks are always called in the same order.
