### Solutions for part5 bloglist-frontend.

In order to start the frontend run the command: `npm start`

In order to start the backend-server locally, run the command:
`cd part4/blog-list`
`npm start`  
To run the backend-server locally in development mode, run the command:
`cd part4/blog-list`
`npm run dev`

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

For more info about part5 exercises 5.1-5.4: https://fullstackopen.com/en/part5/login_in_frontend
For more info about part5 exercises 5.5-5.12: https://fullstackopen.com/en/part5/props_children_and_proptypes
For more info about part5 exercises 5.13.-5.16: https://fullstackopen.com/en/part5/testing_react_apps
