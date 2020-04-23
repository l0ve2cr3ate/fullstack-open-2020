### Solutions for part6 unicafe-redux

In order to start the frontend run the command: `npm start`

### Exercises part6 unicafe-redux

Exercises 6.1.-6.2.
Let's make a simplified version of the unicafe-exercise from part 1. Let's handle the state management with Redux.

6.1: unicafe revisited, step1
Before implementing the functionality of the UI, let's implement the functionality required by the store.
Implement the reducer and its tests. Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality which they are testing.

6.2: unicafe revisited, step2
Implement the actual functionality of the application.

Exercises 6.3.-6.8.
Let's make a new version of the anecdote voting application from part 1.

6.3: anecdotes, step1
Implement the functionality for voting anecdotes. The amount of votes must be saved to a Redux-store.

6.4: anecdotes, step2
Implement the functionality for adding new anecdotes. You can keep the form uncontrolled.

6.5: anecdotes, step3
Make sure that the anecdotes are ordered by the number of votes.

6.6: anecdotes, step4
If you haven't done so already, separate the creation of action-objects to action creator-functions and place them in the src/reducers/anecdoteReducer.js file.

6.7: anecdotes, step5
Separate the creation of new anecdotes into its own component called AnecdoteForm. Move all logic for creating a new anecdote into this new component.

6.8: anecdotes, step6
Separate the rendering of the anecdote list into its own component called AnecdoteList. Move all logic related to voting for an anecdote to this new component.

Exercises 6.9.-6.12
6.9 Better anecdotes, step7
Start using React dev tools. Move defining the Redux-store into its own file store.js.

6.10 Better anecdotes, step8
Extend the Notification component so that it renders the message stored in the redux store, making the component to take the form:

```javascript
import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(/*something here */);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};
```

You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality and refactor the application so that it uses a combined reducer. It is enough for the application to display the initial value set for the message in the notificationReducer.

6.11 Better anecdotes, step9
Extend the application so that it uses the Notification component to display a message for the duration of five seconds when the user votes for an anecdote or creates a new anecdote

6.12 Better anecdotes, step10
Implement filtering for the anecdotes that are displayed to the user. Store the state of the filter in the redux store. It is recommended to create a new reducer and action creators for this purpose. Create a new Filter component for displaying the filter.

For more info about exercises 6.1-6.8: https://fullstackopen.com/en/part6/flux_architecture_and_redux
For more info about exercises 6.9-6.12: https://fullstackopen.com/en/part6/many_reducers
