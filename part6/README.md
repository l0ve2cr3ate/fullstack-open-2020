### Solutions for part6 unicafe-redux and redux-anecdotes

The exercises for part6 are divided into subparts unicafe-redux and redux-anecdotes. You can find the solutions for the subparts in their respective directories.

In order to start unicafe-redux frontend: `cd unicafe-redux` `npm start`
In order to start redux-anecdotes frontend run the command: `cd redux-anecdotes` `npm start`
To start redux-anecdotes json-webserver: `cd redux-anecdotes` `npm run server`

### Exercises part6 unicafe-redux

Exercises 6.1.-6.2.
Let's make a simplified version of the unicafe-exercise from part 1. Let's handle the state management with Redux.

6.1: unicafe revisited, step1
Before implementing the functionality of the UI, let's implement the functionality required by the store.
Implement the reducer and its tests. Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality which they are testing.

6.2: unicafe revisited, step2
Implement the actual functionality of the application.

### Exercises part6 redux-anecdotes

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

Exercises 6.13.-6.14
6.13 Anecdotes and the backend, step1
When the application launches, fetch the anecdotes from the backend implemented using json-server.

6.14 Anecdotes and the backend, step2
Modify the creation of new anecdotes, such that the anecdotes are stored in the backend.

Exercises 6.15.-6.18

6.15 Anecdotes and the backend, step3
Modify the initialization of redux-store to happen using asynchronous action creators, which are made possible by the redux-thunk-library.

6.16 Anecdotes and the backend, step4
Also modify the creation of a new anecdote to happen using asynchronous action creators, made possible by the redux-thunk-library.

6.17 Anecdotes and the backend, step5
Voting does not yet save changes to the backend. Fix the situation with the help of the redux-thunk-library.

6.18 Anecdotes and the backend, step6
The creation of notifications is still a bit tedious, since one has to do two actions and use the setTimeout function:

```javascript
dispatch(setNotification(`new anecdote '${content}'`));
setTimeout(() => {
  dispatch(clearNotification());
}, 5000);
```

Make an asynchronous action creator, which enables one to provide the notification as follows:

```javascript
dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
```

the first parameter is the text to be rendered and the second parameter is the time to display the notification given in seconds.

Exercises 6.19.-6.21

6.19 anecdotes and connect, step1
Modify the AnecdoteList so that it accesses the store's state with the help of the connect function.

6.20 anecdotes and connect, step2
Do the same for the Filter and AnecdoteForm components.

6.21 anecdotes, the grand finale
You (probably) have one nasty bug in your application. If the user clicks the vote button multiple times in a row, the notification is displayed funnily. For example if a user votes twice in three seconds, the last notification is only displayed for two seconds (assuming the notification is normally shown for 5 seconds). This happens because removing the first notification accidentally removes the second notification.

Fix the bug so that after multiple votes in a row, the notification for the last vote is displayed for five seconds. This can be done by cancelling the removal of the previous notification when a new notification is displayed whenever necessary.

### Notes part6 State management with Redux

#### a. Flux-architecture and Redux

In Flux, the state is separated from React components in a _store_. State in the store is not changed directly, but via _actions_.
Flow: Action --> Dispatcher --> Store --> View

**Redux**
Redux works like Fluc principle. State is stored in a _store_ --> whole state of app is stored in one js object. The state of the store is changed with _actions_: objects which have at least a field determining the _type_ of action, and optionally data.
_Reducers_ specify how state changes in response to actions. It takes in current state and action and returns new state --> reducers use switch statements.
Reducers should not be called directly from app code. They are given as a param to `createStore` function:
`const store = createStore(reducer)`.
`store.getState()` returns the state of the store.
`store.dispatch(action)` dispatches action.
`subscribe` creates callback functions that the store calls when stated is changed.

**Pure functions, immutable**
Reducers must be _pure functions_ --> not cause any side effects and always return the same response when called with same params. A reducers state must be composed of _immutable_ objects. If state changes, old object is not mutated, but replaced with new changed object.
`deep-freeze` library can be used to ensure reducer is immutable function --> use it in your tests.

**Array spread syntax**

```javascript
const numbers = [1,2,3]
[...numbers, 4,5] // --> results in [1,2,3,4,5]
[numbers, 4,5] // --> results in [[1,2,3],4,5] (nested array)
const nums = [1,2,3,4,5]
const [first, seconds, ...rest] = nums
// first --> 1
// second --> 2
// rest --> [3,4,5,6]
```

**Uncontrolled form**
In a _controlled_ component, form data is handled by React component. In _uncontrolled_ components form data is handled by the DOM itself. Uncontrolled inputs are like traditional HTML inputs. You can get their value using a ref.

**Action creators** --> functions that create actions:

```javascript
const toggleImportanceOf = (id) -> {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: {id}
  }
}
```

In the component where you dispatch the action:

```javascript
const toggleImportance = (id) => {
  store.dispatch(toggleImportanceOf(id));
};
```

**Forwarding Redux-Store to various components**
React-redux provide a _Provider_ component which can be wrapped around the app. The app's store is given to the provider as its attribute store. `useDispatch` provides any React component access to dispatch-function of redux-store. Components can access store with `useSelector` hook from react-redux. useSelector receives a function as a param. The function searches for or selects data from redux-store.

_Presentational_ components: only concerned with UI.
_Container_ components: contain app logic.

#### b. Many reducers

**Store with complex state**
Radio buttons with the same name attribute form a 'button group', where only one option can be selected.

**Combined reducers**
We can create multiple reducers to handle returning multiple pieces of state. The reducers can be combined with `combineReducer` function from redux:

```javascript
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});
```

--> the state of the store is an object with the properties notes and filter.
_Notice:_ The combined reducer works in such a way that every action gets handled in every part of the combined reducer.

**Redux Devtools** --> chrome extension to monitor redux-store state and actions --> needs redux-devtools-extension. Use it like:

```javascript
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore({
  reducer,
  composeWithDevTools()
})
```

#### c. Communicating with server in a redux app

**Asynchronous actions and redux thunk**
Redux-thunk enables us to create _async actions_. It is _redux middleware_ and needs to be initialized:

```javascript
const store = createStore({
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
})
```

Redux-thunk lets you define action creators that return a function having a dispatch-method of redux-store as param. This makes it possible to create async action creators, which wait for some operation to finish before they dispatch the action.

```javascript
const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: "INIT_NOTES",
      data: notes,
    });
  };
};
```

#### d. Connect

**Important**: use `useSelector` and `useDispatch` in new apps (instead of `connect`).
**Using connect function to share redux store to components**
`connect` can be used to connect component to redux store. It accepts a `mapStateToProps` function which can be used for defining the props of the connected component based on the state if the redux store.
`mapDispatchToProps` is the second param of `connect` function --> group of action creator functions passed to connected component as props.

**Referencing action creators passed as props**
Reference action creator like: `props.createNote`: it contains automatic dispatch added by connect. Don't call the imported (unmodified) version, since it does not contain the added automatic dispatch. --> console.log both functions to see the difference.

**Alternative way to using mapDispatchToProps**
version 1:

```javascript
const NewNote = () => {
  /*...*/
};
export default connect(null, { createNote })(NewNote);
```

The functions passed in mapDispatchToProps must be action creators (functions that return redux actions).

version 2:

```javascript
const mapDispatchToProps => dispatch => {
  return {
    createNote: value => {
      dispatch(createNote(value))
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(NewNote)
```

--> mapDispatchToProps is a function that connect will invoke by passing it the dispatch function as a param. The return value of the function is an object that defines a group of functions that get passed to connected component as props. This 2nd version of mapDispatchToProps can be needed if dispatched actions need to reference props of the component.

**Presentational/Container revisited**
_Presentational component_

- concerned with how things look
- often allow containment via props.children
- have no dependencies of the rest of the app
- don't specify how data is loaded/mutated
- receive data and callbacks via props
- rarely have own state (only UI state)
- functional components

_Container component_

- how things work
- provide data and behavior to presentational/other container components
- call redux actions + provide these as callbacks to presentational components
- statefull
- connect

**connect**
--> _Higher order component_ (HOC): a function taht accepts a 'regular' component as its param and returns a new component as its return value. A HOC is a generalization of _higher order function_ concept (HOF). _HOF_: function that accepts functions as param and returns functions. For example: map, filter, find.

**Redux and component state**
When using redux, you can still use local state for certain situations. Complicated forms can for example be handled using useState (local component state)

For more info about exercises 6.1-6.8: https://fullstackopen.com/en/part6/flux_architecture_and_redux
For more info about exercises 6.9-6.12: https://fullstackopen.com/en/part6/many_reducers
For more info about exercises 6.13-6.18: https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application
For more info about exercises 6.19.-6.21: https://fullstackopen.com/en/part6/connect
