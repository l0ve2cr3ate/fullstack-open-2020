### Solutions for part5 bloglist-frontend.

In order to start the frontend run the command: `npm start`

In order to start the backend-server locally, run the command:
`cd part4/blog-list`
`npm start`  
To run the backend-server locally in development mode, run the command:
`cd part4/blog-list`
`npm run dev`

This app uses mongodb. You will need to add a `MONGO_URI` to your `.env` file.

### Exercises part5 bloglist-frontend

We will now create a frontend for the bloglist backend we created in part4.

Exercises 5.1.-5.4

5.1: bloglist frontend, step1
Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user. If a user is not logged in, only the login form is visible. If user is logged in, the name of the user and a list of blogs is shown.

5.2: bloglist frontend, step2
Make the login 'permanent' by using the local storage. Also implement a way to log out.

5.3: bloglist frontend, step3
Expand your application to allow a logged in user to add new blogs.

5.4: bloglist frontend, step4
Implement notifications which inform the user about successful and unsuccessful operations at the top of the page. The notifications must be visible for a few seconds.

Exercises 5.5.-5.10

5.5 Blog list frontend, step5
Change the form for creating blog posts so that it is only displayed when appropriate. By default the form is not visible. It expands when button new note is clicked. The form closes when a new blog is created.

5.6 Blog list frontend, step6
Separate the form for creating a new blog into its own component, and move all the states required for creating a new blog to this component.

5.7 Blog list frontend, step7
Let's add each blog a button, which controls if all of the details about the blog are shown or not.
Full details of the blog open when the button is clicked. And the details are hidden when the button is clicked again.

5.8: Blog list frontend, step7
Implement the functionality for the like button. Likes are increased by making an HTTP PUT request to the unique address of the blog post in the backend.

5.9: Blog list frontend, step8
Modify the application to list the blog posts by the number of likes.

5.10: Blog list frontend, step9
Add a new button for deleting blog posts. Also implement the logic for deleting blog posts in the backend. The confirmation dialog for deleting a blog post is easy to implement with the window.confirm function. Show the button for deleting a blog post only if the blog post was added by the user.

Exercises 5.11.-5.12

5.11: Blog list frontend, step11
Define PropTypes for one of the components of your application.

5.12: Blog list frontend, step12
Add ESlint to the project. Define the configuration according to your liking. Fix all of the linter errors.

Exercises 5.13.-5.16

5.13: Blog list tests, step1
Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.

5.14: Blog list tests, step1
Make a test, which checks that blog's url and number of likes are shown when the button controlling the shown details has been clicked.

5.15: Blog list tests, step2
Make a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

5.16: Blog list tests, step3
Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is called.

Exercises 5.17.-5.22

5.17: bloglist end to end testing, step1
Configure Cypress to your project. Make a test for checking that the application displays the login form by default. The beforeEach formatting blog must empty the database.

5.18: bloglist end to end testing, step2
Make tests for logging in. Test both successful and unsuccessful log in attempts.
Make a new user in the beforeEach block for the tests.
Optional bonus exercise: Check that the notification shown with unsuccessful login is displayed red.

5.19: bloglist end to end testing, step3
Make a test which checks, that a logged in user can create a new blog.

5.20: bloglist end to end testing, step4
Make a test which checks that user can like a blog.

5.21: bloglist end to end testing, step5
Make a test for ensuring, that the user who created a blog can delete it.
Optional bonus exercise: also check that other users cannot delete the blog.

5.22: bloglist end end testing, step 6
Make a test which checks, that the blogs are ordered according to likes with the blog with the most likes being first.

For more info about part5 exercises 5.1-5.4: https://fullstackopen.com/en/part5/login_in_frontend
For more info about part5 exercises 5.5-5.12: https://fullstackopen.com/en/part5/props_children_and_proptypes
For more info about part5 exercises 5.13.-5.16: https://fullstackopen.com/en/part5/testing_react_apps
For more info about part5 exercises 5.17-5.22: https://fullstackopen.com/en/part5/end_to_end_testing

### Notes part 5 - Testing React Apps

#### a. Login in frontend

To implement login on the frontend a form is needed + a POST request to `/api/login` + token.

**Saving the token to browsers localStorage**
--> when frontend page rerenders user info is lost --> solution --> save login details to _localStorage_: key-value based db in the browser.
`window.localStorage.setItem('name', 'John Doe')` --> saves 2nd parameter as value of key name.
To find item: `window.localStorage.getItem('name')`
To remove item: `window.localStorage.removeItem('name')`
Values in localStorage are preserved when page rerenders. localStorage = _origin-specific_ --> defined by scheme (protocol), host (domain) and port.
Values saved to localStorage are DOMStrings. To store an object you will need to use `JSON.stringify`.
To read an object from localStorage use `JSON.parse`.

--> use `useEffect` to check if user is stored in localStorage.

#### b. props.children and proptypes

--> code managing visibility of another component could be extracted to separate Togglable component. The component wrapped in the Toggable component is a child component.

```
<Togglable>
    <ChildComponent>
</Togglable>
```

inside Togglable component:

```
<div>{props.children}</div>
```

`props.children` is used to reference child component.

**References to components with refs**

```
const noteFormRef = React.createRef() (in App component)

<Togglable ref={noteFormRef}>
```

--> the noteFormRef variable acts as a reference to the component.

```
const Togglable = React.forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility()
        }
    })
})
```

The function that creates the component is wrapped in a forwardRef function call --> component can access the ref that is assigned to it --> useImperativeHandle makes toggleVisibility function available outside component. It can be used for defining functions in a component which can be invoked from ouside the component.

**One point about components**

```
<>
    <Togglable ref={togglable1}>1</Togglable>
    <Togglable ref={togglable2}>2</Togglable>
</>
```

--> 2 separate instances of the component with their own separate state are created. The ref attribute is used for assigning a reference to each of the components.

#### c. Testing React Apps

Rendering the component for tests:

```
const component = render(
    <Note note={note} />
)
```

`render` is provided by react-testing-library. Normally components are rendered to the DOM. The render method of react-testing-library renders components in a format suitable for tests, without rendering them to the DOM.
`render` returns an object with several properties, for example `container`: HTML rendered by component.

**Running Tests**
Create-react-app runs tests in watch mode. To exit your tests after running use: `CI=true npm test`

**Test-file location**
In React 2 different conventions for testfile localtion exist:

- same directory as component being tested
- in separate test directory

**Searching for content in component**

- `.toHaveTextContent()` --> search for matching text in entire HTML rendered by component.
- `.getByText()` --> returns element which contains given text.
- `.querySelector()` --> look for component based on className/selector.

**Debugging tests**
Object returned by render method had `debug` method --> prints HTML rendered by component to console.
With `prettyDOM` (import from @testing-library/dom) you can also print HTML of smaller parts of component:

```
const li = component.container.querySelector('li')
console.log(prettyDOM(li))
```

**Clicking buttons in tests**

```
const button = getByText('Login')
fireEvent.click(button)
```

--> use `jest.fn` to mock function
--> use `fireEvent.click` to simulate click event.

Mock objects and functions are used to stub components in testing that are used for replacing dependencies of the components being tested. --> makes it possible to return hard coded responses and verify # of times mock functions are called with and with what parameters.

**Tests for the Togglable component**

- `beforeEach` function gets called before each test. Can be used to render component.
- `.toHaveStyle` --> check style properties
- `.querySelector` --> returns 1st matching element
- `.getByText` --> returns all matching elements

**Testing Forms**
Text input can be simulated with fireEvent:

```
fireEvent.change(input, {
    target: {
        value: 'Input text here...'
    }
})

fireEvent.submit(form)
```

**Test Coverage**
`CI=true npm test -- --coverage`

**Frontend integration tests**
Integration testing tests the collaboration of multiple components --> mock server data.

**Snapshot testing**
Principle: compare HTML code defined by component after changes, with HTML code before --> if there is a difference --> is it new functionality or a bug?

#### d. End to end testing

Test system as whole --> End to End (E2E)

- potentially most useful category of tests --> test system trough same interface as real users.
- execution time can be slow
- can be flaky --> sometimes pass, sometimes fail when code hasn't changed

**Cypress**
--> runs tests complety within the browser. Other libraries run tests in a Node-process, which is connected to the browser through API.
Unlike unit tests, Cypress tests can be in the frontend/backend or a separate repo. The tests require the tested system to be running. Cypress doesn't start the system when tests are run (like supertest on the backend integration tests did).
Cypress uses `describe` blocks to group different test cases and uses `it` for single test cases --> it uses Mocha under the hood.

- `cy.visit` opens web address given as param
- `cy.contains` searches for the string it receives as param

Mocha recommands not to use arrow functions, because they might cause issues!

**Writing a form**

- `cy.click` click element
- `cy.get` searches elements by CSS selector
- `cy.type` types into input field

**Some things to note**
`cy.contains` also finds elements with `display:none` style. It will return the 1st matching element.
--> to get rid of eslint error `'cy' is not defined` install `eslint-plugin-cypress` +
add `"cypress/globals": true` to `"env"` object in `.eslintrc.js` + `"cypress"` to plugins array in same file.

Write your tests in a way so they don't break when adding something like an extra button or input field to the page. Cypress runs tests in order they are in the code. But keep in mind each test starts from zero as far as the browser is concerned. All changes to the browser's state are reversed after each test.

**Controlling the state of the db**
E2E tests don't have access to db. **Solution**: create API endpoints to the backend for the test. db can be emptied using these endpoints. Create router for tests, which will only run in test environment. Do POST request to this route in the `beforeEach` to empty db, using `cy.request`. Add new user to db, and visit localhost.

`it.only` will run only this test (save time during development/debugging).
should syntax: `cy.get(...).should('contain'...).should('have.css', 'color', 'rgb(255,0,0)')`
`.should` should always be chained to chainable command like `.get`
--> colors should be given as rgb in Cypress.
Tests can be chained with `.and` (if they use same selector/element)

**Bypassing the UI**
Each test starts from zero. Fully test login, but only once. In `beforeEach` block you can log user in by bypassing the UI and doing HTTP request to backend --> faster.
Don't forget to save credentials to localStorage.
Access response to `cy.request` with `.then` method.

**Custom commands**
You can create custom commands for operations you need to perform multiple times, like logging in --> in `cypress/suppert/commands.js`

```
Cypress.command.add('login', {username, password}) => {
    cy.request('POST', 'http://localhost:3001/api/login',
        {username, password
        }).then(({body}) => {
            // set localStorage
            // visit frontend
        } )
}
```

Use the custom command: `cy.login({username: 'jane', password: 'secret'})`

When creating tests, check in the test runner that the tests use the right components!

- `.parent`--> access parent element
- `.find` --> search for element
- `cy.get` --> searches whole page
- `cy.find` --> searched within element
- `.as` --> creates alias for element: `.as('elementName')` --> use it like `cy.get('@elementName')`

**Running and debugging tests**
When Cypress runs a test it adds each `cy` command to an execution queue. When the code of the test method has been executed, Cypress will execute each command in the queue one by one. Cypress commands always return undefined, so you can't store `cy.contains('Login')` in a variable to use it.
Cypress commands are like promises. Use `.then` to access their values.
Use `cy.debug()` to stop test execution --> Cypress test runner developer console needs to be open. Noraml debugger() command won't stop the code between executing commands, but before any commands have been executed.

Apart from running Cypress test with the graphical test runner, you can run cypress tests from the command line using `cypress run`.
Don't forget to add `cypress/videos` to `.gitignore`.
