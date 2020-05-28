### Solutions for part7

The exercises for part7 are divided into subparts. You can find the solutions for the subparts in their respective directories.

First cd into part 7: `cd part7`
In order to start routed-anecdotes : `cd routed-anecdotes` `npm start`
In order to start country-hook: `cd country-hook` `npm start`
In order to start ultimate-hook frontend: `cd ultimate-hooks` `npm start`
In order to start ultimate-hook json-webserver: `cd ultimate-hooks` `npm start server`
In order to start frontend extend-bloglist-frontend: `cd extend-bloglist-frontend` `npm start`
In order to start the backend-server locally, run the command:
`cd extend-bloglist-backend`
`npm start`  
In order to start backend-server locally in development mode for extend-bloglist: `cd extend-bloglist-backend` `npm run dev`
The blog-list app uses mongodb. You will need to add a `MONGO_URI` to your `.env` file.

### Exercises part7 routed-anecdotes

Exercises 7.1.7.3

7.1: routed anecdotes, step1
Add React Router to the application so that by clicking links in the Menu-component the view can be changed. At the root of the application, meaning the path `/`, show the list of anecdotes. The Footer-component should always be visible at the bottom. The creation of a new anecdote should happen e.g. in the path create.

7.2: routed anecdotes, step2
Implement a view for showing a single anecdote. Navigating to the page showing the single anecdote is done by clicking the name of that anecdote.

7.3: routed anecdotes, step3
The default functionality of the creation form is quite confusing, because nothing seems to be happening after creating a new anecdote using the form. Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next 10 seconds.

Exercises 7.4.-7.8
7.4: anecdotes and hooks step1
Simplify the anecdote creation form of your application with the useField custom hook.

7.5: anecdotes and hooks step2
Add a button to the form that you can use to clear all the input fields. Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

7.6: anecdotes and hooks step3
If your solution did not cause a warning to appear in the console you have already finished this exercise.
If you see the warning in the console, make the necessary changes to get rid of the `Invalid value for prop reset' on <input> tag` console warning. The input element should not be given a reset attribute. Come up with a solution that fixes the issue, but is still easy to use with spread syntax.

### Exercise part 7 country-hook

7.7: country hook
The application can be used to search for country details from the https://restcountries.eu/ interface. If country is found, the details of the country are displayed. If country is not found, message is displayed to the user. The application is otherwise complete, but in this exercise you have to implement a custom hook useCountry, which can be used to search for the details of the country given to the hook as a parameter. Use the api endpoint full name to fetch country details in a useEffect-hook within your custom hook.

### Exercise part 7 ultimate-hooks

7.8: ultimate hooks
The code of the application responsible for communicating with the backend of the note application of the previous parts looks like this:

```javascript
import axios from "axios";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
```

The code is in no way specific to the fact that our application deals with notes. Excluding the value of the baseUrl variable, the same code could be reused in the blog post application for dealing with the communication with the backend.

Extract the code for communicating with the backend into its own `useResource` hook. It is sufficient to implement fetching all resources and creating a new resource. The `useResource` custom hook returns an array of two items just like the state hooks. The first item of the array contains all of the individual resources and the second item of the array is an object that can be used for manipulating the resource collection, like creating new ones.

### Exercises part 7 extending-bloglist

Exercises 7.9.-7.21.
7.9: redux, step1
Refactor the application from using internal React component state to using Redux for the application's state management.

Additionally, change the application's notifications to use Redux at this point of the exercise set.

7.10: redux, step2
Store the information about blog posts in the Redux store. In this exercise it is enough that you can see the blogs in backend and create a new blog.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.

7.11: redux, step3
Expand your solution so that it is again possible to like and delete a blog.

7.12: redux, step4
Store the information about the signed in user in the Redux store.

7.13: Users view
Implement a view to the application that displays all of the basic information related to users.

7.14: Individual user view
Implement a view for individual users, that displays all of the blog posts added by that user.
You can access the view by clicking the name of the user in the view that lists all users.

7.15: Blog view
Implement a separate view for blog posts. Users should be able to access the view by clicking the name of the blog post in the view that lists of all of the blog posts. After you're done with this exercise, the functionality that was implemented in exercise 5.6 is no longer necessary. Clicking a blog post no longer needs to expand the item in the list and display the details of the blog post.

7.16: Navigation
Implement a navigation menu for the application.

7.17: comments, step1
Implement the functionality for commenting on blog posts.
Comments should be anonymous, meaning that they are not associated to the user who left the comment. An appropriate mechanism for adding comments to a blog post would be an HTTP POST request to the api/blogs/:id/comments endpoint.

7.18: comments, step2
Extend your application so that users can add comments to blog posts from the frontend.

7.19: Styles, step1
Improve the appearance of your application by applying one of the methods shown in the course material.

7.20: Styles, step2
You can mark this exercise as finished if you use an hour or more for styling your application.

### Notes part 7: React router, custom hooks, styling app with css and webpack.

#### a. React Router

**Application Navigation Structure**
In old school web apps, changing a page would be accomplished by making an HTTP GET request to the server + rendering HTML representing the view that is returned. In Single Page Applications, we are actually always on the same page. If HTTP requests are made switching views, they only fetch data.
Each view should have it's own address to make bookmarking possible + let back button behave like expected.
`react router` can be used to handle navigation.
`BrowserRouter` is a `Router` that uses `HTML5 historyAPI` to keep UI in sync with URL --> place pages inside the router.
Normally the browser loads a new page when the url in the address bar changes. `BrowserRouter` helps to use url in address bar for internal routing --> browser will not load new content from server.

```javascript
<Link to="/notes">notes</Link>
```

creates a link with url `/notes`

```javascript
<Route path="/notes">
  <Notes />
</Route>
```

defines which component should be rendered on `/notes` route.

Wrap the `Routes` in a `Switch` component to render the first component whose path matches the url in the address bar. Order is important!
`/` is the start of every path, so if you render this route first, none of the other components will be rendered.

**Parameterized route**
`path="/notes/:id"` --> :id is param
in the Note component:

```javascript
const id = useParams().id; // --> Note component can access url param with useParams.
const note = notes.find((n) => n.id === Number(id));
```

**useHistory**

```javascript
const history = useHistory(); /* --> with this function component can access history object which is used to modify browser's url programmatically*/
history.push("/"); // --> route back to home
```

**Redirect**

```javascript
<Route path="/users" render={() => user ? <Users />: <Redirect to="/login" />}>
```

If user isn;t logged in, redirect to login.

Footer needs to be shown on all pages --> place it outside of the router.

**Parameterized route revisited**
Note component receives all notes, but only needs one. Solution: use `useRouteMatch` --> can't be used in component where Router is defined.

```javascript
const match = useRouterMatch("/notes/:id");
const note = match
  ? notes.find((note) => note.id === Number(match.params.id))
  : null;
```

#### b. Custom hooks

**Rules of hooks**

- Don't call hooks from inside loops, conditionals or nested functions --> always use them at the top level of your React component.
- Don't call hooks from regular Javascript functions --> call hooks from React functions or from custom hooks.

**Custom Hooks**
Primary purpose: facilitate reuse of logic used in components.

#### c. More about Styles

There are multiple ways to style React app. You can use an UI framework to speed up your development. `Styled components` is a popular CSS-in-JS solution for styling React apps.

For more info about exercises 7.1-7.3 react-router: https://fullstackopen.com/en/part7/react_router
For more info about exercises 7.4-7.8 custom hooks: https://fullstackopen.com/en/part7/custom_hooks
For more info about exercises 7.9.7.21 extending-bloglist: https://fullstackopen.com/en/part7/exercises_extending_the_bloglist
