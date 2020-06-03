### Solutions for part7

The exercises for part7 are divided into subparts. You can find the solutions for the subparts in their respective directories.

First cd into part 7: `cd part7`</br>
In order to start routed-anecdotes : `cd routed-anecdotes` and then `npm start`</br>
In order to start country-hook: `cd country-hook` and then `npm start`</br>
In order to start ultimate-hook frontend: `cd ultimate-hooks` and then `npm start`</br>
In order to start ultimate-hook json-webserver: `cd ultimate-hooks` and then `npm run server`</br>
In order to start frontend extend-bloglist-frontend: `cd extend-bloglist-frontend` and then `npm start`</br>
In order to start the backend-server locally, run the command:`cd extend-bloglist-backend` and then `npm start` </br>
In order to start backend-server locally in development mode for extend-bloglist: `cd extend-bloglist-backend` and then `npm run dev` </br>
The blog-list app uses mongodb. You will need to add a `MONGO_URI` to your `.env` file. </br>

### Exercises part7 routed-anecdotes

Exercises 7.1.7.3</br>
7.1: routed anecdotes, step1 </br>
Add React Router to the application so that by clicking links in the Menu-component the view can be changed. At the root of the application, meaning the path `/`, show the list of anecdotes. The Footer-component should always be visible at the bottom. The creation of a new anecdote should happen e.g. in the path create.

7.2: routed anecdotes, step2 </br>
Implement a view for showing a single anecdote. Navigating to the page showing the single anecdote is done by clicking the name of that anecdote.

7.3: routed anecdotes, step3 </br>
The default functionality of the creation form is quite confusing, because nothing seems to be happening after creating a new anecdote using the form. Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next 10 seconds.

Exercises 7.4.-7.8 </br>
7.4: anecdotes and hooks step1
Simplify the anecdote creation form of your application with the useField custom hook.

7.5: anecdotes and hooks step2 </br>
Add a button to the form that you can use to clear all the input fields. Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

7.6: anecdotes and hooks step3 </br>
If your solution did not cause a warning to appear in the console you have already finished this exercise.
If you see the warning in the console, make the necessary changes to get rid of the `Invalid value for prop reset' on <input> tag` console warning. The input element should not be given a reset attribute. Come up with a solution that fixes the issue, but is still easy to use with spread syntax.

### Exercise part 7 country-hook

7.7: country hook </br>
The application can be used to search for country details from the https://restcountries.eu/ interface. If country is found, the details of the country are displayed. If country is not found, message is displayed to the user. The application is otherwise complete, but in this exercise you have to implement a custom hook useCountry, which can be used to search for the details of the country given to the hook as a parameter. Use the api endpoint full name to fetch country details in a useEffect-hook within your custom hook.

### Exercise part 7 ultimate-hooks

7.8: ultimate hooks </br>
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

Exercises 7.9.-7.21 </br>
7.9: redux, step1
Refactor the application from using internal React component state to using Redux for the application's state management.

Additionally, change the application's notifications to use Redux at this point of the exercise set.

7.10: redux, step2 </br>
Store the information about blog posts in the Redux store. In this exercise it is enough that you can see the blogs in backend and create a new blog.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.

7.11: redux, step3 </br>
Expand your solution so that it is again possible to like and delete a blog.

7.12: redux, step4 </br>
Store the information about the signed in user in the Redux store.

7.13: Users view </br>
Implement a view to the application that displays all of the basic information related to users.

7.14: Individual user view </br>
Implement a view for individual users, that displays all of the blog posts added by that user.
You can access the view by clicking the name of the user in the view that lists all users.

7.15: Blog view </br>
Implement a separate view for blog posts. Users should be able to access the view by clicking the name of the blog post in the view that lists of all of the blog posts. After you're done with this exercise, the functionality that was implemented in exercise 5.6 is no longer necessary. Clicking a blog post no longer needs to expand the item in the list and display the details of the blog post.

7.16: Navigation </br>
Implement a navigation menu for the application.

7.17: comments, step1 </br>
Implement the functionality for commenting on blog posts.
Comments should be anonymous, meaning that they are not associated to the user who left the comment. An appropriate mechanism for adding comments to a blog post would be an HTTP POST request to the api/blogs/:id/comments endpoint.

7.18: comments, step2 </br>
Extend your application so that users can add comments to blog posts from the frontend.

7.19: Styles, step1 </br>
Improve the appearance of your application by applying one of the methods shown in the course material.

7.20: Styles, step2 </br>
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

If user isn't logged in, redirect to login.

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

#### d. Webpack

**Bundling**
The code of React apps is divided into separate modules, but browsers can't handle these modules. Code that is divided into modules must be _bundled_ (transformed into a single file) to be readable for browsers. Webpack is a tool which can bundle code.
Create-react-app uses webpack under the hood for bundling. It is possible to _eject_ the app, so you can configure your own webpack, but after ejecting you can't go back to the default configuration.
You can also use Webpack to bundle files yourself. In the `webpack.config.js` file you will need to specify the _entry point_ (e.g. index.js), which specifies the file that will server as entry point for bundling the app, and the _output path + filename_. The output property defines the location where the bundled code will be stored. Target directory must be defined as _absolute path_ (use `path.resolve` method). `__dirname`: global variable is Node which stores path to current directory.

**Bundling React**
For bundling React we will need a `build/index.html` file that will serve as the 'main page' of the app, and will load the bundled js code with a script tag.

**Loaders**
By default, Webpack can only handle plain js, not JSX. _Loaders_ inform Webpack which files need processing before bundling. We can use a loader to transform JSX into regular js (babel-loader).
Loaders are defined under the `module` property in the `rules` array in the `webpack.config.js` file. Loaders consist of three parts:

1. test
2. loader
3. query

The _test_ property specifies for which files the loader is (e.g.files ending with `.js$`). The _loader_ property specifies which loader should be used for the processing. The _query_ property specifies parameters for the loader, like presets.

**Note:** If the bundled code uses `async/await` syntax, the browser will not render anything on some browsers. To fix this issue, we can use a polyfill (`@babel/polyfill`). This polyfill should be added to the entry point in the `webpack.config.js` file: `['@babel/polyfill', './src/index.js']`

**Transpilers**
_Transpiling_: process of transforming code of one form of js to another --> compile code by transforming it from one language tp another. Babel helps us transpile JSX into js. The transpilation process executed by Babel is defined with `plugins`. Presets are pre-configured plugins. You can use `@babel/preset-react` for transpiling JSX. `@babel/preset-env` plugin transpiles ESNext code into ES5.

**CSS**
When using CSS, we have to use `CSS and style loaders`.
_CSS loader_ loads the CSS files and _style loader_ generates and injects a style element that contains all styles of the app. CSS definitions are included in the main.js file with this config. To generate a separate CSS file `mini-extract-plugin` can be used.

**Webpack-Dev-Server**
_Webpack-dev-server_ starts web-app at configured port and refreshes page after changes. When using `webpack-dev-server` the code is not bundled into main.js but in memory.

**Source maps**
_Source-map_ makes it possible to map errors that occur during execution of bundle to corresponding part of original source-code.

**Minifying the Code**
Starting from version 4 of Webpack, minification plugin does not require additional configuration, just add `--mode=production` to bundling script --> comments, unneccessary whitespace and newline characters will be removed and variable names will be replaced with single character.

**Development and production configuration**
We can create different configurations for webpack for development and production.

**Polyfill**
Axios uses promises and Internet Explorer does not support promises. We can use a polyfill to solve this problem.

#### e. Class Components, Miscellaneous

**Class Components**

- Class components can have a _constructor_
- Class components have a _render_ method
- Class components contain one state: `state = {}` or `this.state = {}`
- Class components have _life-cycle_ methods.
- Data should be fetch in _ComponentDidMount_ lifecycle method, which will be executed once right after the 1st time a component renders.
- State is changed with _setState_ method. Calling _setState_ triggers a rerender of the class component.

Benefit of functional components: no _this-referende_
Class components offer no benefits over functional components with hooks, with exception of _error-boundry_ mechanism --> catch js errors anywhere in child component tree, log these errors and display fallback UI.

**Websockets** --> makes 2-way communication between browser and server possible. Websocket API is not fully supported, but you can use Socket.io which has fallbacks.

**Virtual DOM**
Function defining React component returns a set of _React-elements_. These React-elements make up the _virtual DOM_, which is stored in system memory during runtime. _ReactDOM_ renders React-elements in the virtual DOM to the real DOM. When the state of the app changes, a new virtual DOM gets defined. React compares previous virtual DOM in memory with new virtual DOM so it only has to update changed elements in the real DOM instead of rendering the whole DOM.

**React/Node-application security**
One of the most common security risks in web-apps is _injection_: text (or something else) send using a form in an app is interpreted completely different than software developer intended.
Example: _SQL-injection_ --> prevented by _sanitizing_ the input: check if parameters of the query contain forbidden characters, if so, replace forbidden characters with safe alternative by escaping them.
Injection attacks are also possible in NoSQL-databases. Mongoose prevents injection attacks by sanitizing the queries.
_Cross-site Scripting (XSS)_: attack where it is possible to inject malicious js into legitimate web-app. The malicious code would then be executed in the browser of the victim. React sanitizes data in variables to help prevent these kind of attacks.

For more info about exercises 7.1-7.3 react-router: https://fullstackopen.com/en/part7/react_router </br>
For more info about exercises 7.4-7.8 custom hooks: https://fullstackopen.com/en/part7/custom_hooks </br>
For more info about exercises 7.9.7.21 extending-bloglist:
https://fullstackopen.com/en/part7/exercises_extending_the_bloglist
