# fullstack-open-2020

Course of the University of Helsinki about building single page applications with ReactJS that use REST APIs built with Node.js. The course also contains a section on GraphQL, a modern alternative to REST APIs.
The course covers testing, configuration and environment management, and the use of MongoDB for storing the application’s data.

https://fullstackopen.com/en

## Review Fullstack Open 2020
### Prerequisits
- good programming skills
- basic knowledge of web programming
- basic knowledge of databases
- basic knowledge of Git
- have perserverance and capacity for solving problems and seeking information independently
- no prior Javascript knowledge required

### What you will learn
- React
- Redux
- Node.js
- MongoDB
- GraphQL
- Typescript
- React Native
- CI/CD (Continuous Integration/Continuous Delivery/Continuous Deployment)

### 12 Parts
The course consists of part 0 - 11, each with a different subject. A separate review for part 10 React Native can be found [here](https://github.com/l0ve2cr3ate/rate-repository-app/blob/master/README.md#course-review-part-10-react-native). The separate review for part 11 CI/CD can be read [here](https://github.com/l0ve2cr3ate/fullstack-open-part11-bloglist#course-review-part-11-fullstack-open)

### Time Commitment
Estimated time for completing one course part is one week (15-20 hours). Some parts will take longer than others, and your previous experience will also determine how fast you will be able to complete the exercises. The course is self-paced, you can work through the course material at your own pace. The course material is setup to be completed one part at a time.

### Course Certificate
You can earn a certificate if you complete and submit the course exercises before 15 February 2021. The 2021 edition of the course will start 15 March 2021.

### Course Content
#### Part 0 - Fundamentals of web apps
Part 0 is an overall introduction to the course. 
It introduces you to some concepts like HTTP requests, how traditional web apps work, DOM, CSS and Single Page Applications.

#### Part 1 Introduction to React
Part 1 introduces you to React concepts. It starts with the basics, like components, props and JSX, and gradually introduces you to more advanced concepts. You will go over Javascript functionalities that are used a lot in React, like `.map()`. You will apply what you have learned in the apps you will be building. You will learn about destructuring, event handlers in React and passing state to child components. You will get introduced to spread operator, hooks and their rules and conditional rendering.

**Apps** <br>
You will create your first React app in this part, an app containing course information, like the title, the number of exercises, etc. The second app you will create is called 'unicafe' and collects feedback (good, neutral or bad) from customers. The last app you create in part 1 is an ancedotes app, which displays short one-liners, which can be voted on.

#### Part 2 Communicating with the Server
In this part you will learn how to display list items in React and how to handle forms. Till this part all the apps you have built only have a frontend. Part 2 introduced you to JSON server and fetching data from it. You will learn to use `axios` for sending `GET`, `PUT`, `POST` and `DELETE` requests.
This part concludes with information about ways to style your React app.

**Apps**
- You will refactor and improve the course information app that you have built in part 1.
- Phonebook app, for displaying contact names and their phonenumbers.
- Data for countries app, displaying capital, population, spoken languages, weather and flag of the country you have searched for.

#### Part 3 Programming a server with NodeJS and Express
Part 3 is focused on the backend. You will implement a simple REST API in Node.js using Express. You will learn how to connect to a database to store and retrieve data. The data will be stored in MongoDB, and you will learn how to deploy your app.

**Apps**
- phonebook backend
- phonebook fullstack --> let frontend phonebook app from part 2 and phonebook backend created in this part work together.

#### Part 4 Testing Express Servers, User Administration
You will learn to write unit and integration tests for the backend using `Jest` and `supertest`, and implement user authentication and authorization, using `bcrypt` and `JWT`.

**Apps**
- blog listing app: allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog author, title, url, and amount of upvotes from users are saved.

#### Part 5 Testing React Apps
After spending some time working on backend code, in this part you will switch back to the frontend. You will implement token based authentication so users are able to login to your app. You will be writing tests for React components using `Jest`, `React Testing Library` and `Cypress`.
 
**Apps**
- blog listing app frontend

#### Part 6 State management with Redux
Part 6 is an introduction to Redux, which can be used for more complex state management of your React app. You will learn about concepts like immutability, global store, actions and reducers. You will learn how to use Redux with hooks, and be introduced to the old `connect` higher order component so you know how to use it when you work on older code bases. Asynchronous code will be handled using `redux thunk`.

**Apps**
- unicafe
- anecdotes

#### Part 7 React router, custom hooks, styling app with css and webpack
Part 7 handles a lot of different subjects. You will learn how to use React router (with hooks) to navigate in React apps, how to create custom hooks, which ways there are to style your app and which UI libraries you can use. This part also handles how you can use Webpack instead of Create-React-App to setup your app, and gives a short overview of class components.

**Apps**
- routed anecdotes
- country data
- ultimate hooks --> create a data fetching hook which can be used in notes and phonebook app.
- bloglist

#### Part 8 GraphQL
GraphQL is an alternative to REST for communication between browser and server. You will learn about basic GraphQL concepts like schemas (which describe the data sent between client and server), queries and resolvers. In part 8 you will setup `Apollo Server`, and learn how to use `Apollo Client`. You will use `mongoose` to store data in `MongoDB`, and add user login to your app. Concepts like updating the cache, fragments, subscriptions and 'n + 1' problem are explained.

**App**
Book app, which displays info about books (title, author, published), authors and favorite genre. The app will have the option for users to login, and users are able to add books to the app. Books can be filtered by genre.

#### Part 9 Typescript
In part 9 you will learn how to setup your Typescript project. You will use Typescript together with Express and React. Building the app, you will learn about Typescript concepts enum, union, utility types, type guards and practice how to implement these concepts typing Express and React apps.

**Apps**
- body-mass-index
- exercise-calculator
- patientor backend: medical record app for doctors who handle diagnoses and basic health info of patients.
- patientor frontend

#### Part 10 React Native
For part 10 I did write a separate review, you can find it [here](https://github.com/l0ve2cr3ate/rate-repository-app/blob/master/README.md#course-review-part-10-react-native)

#### Part 11 CI/CD
Part 11 has a separate review, you can find it [here](https://github.com/l0ve2cr3ate/fullstack-open-part11-bloglist#course-review-part-11-fullstack-open)

### High Quality Course Content
This course is a university course and contains the same content as the Fullstack Open course at the University of Helsinki in spring 2020. Students with a Finnish social security number can earn 3-9 credits for the course. 
The course content is up-to-date and of high quality.

### Refactoring 
One of the things I like about Fullstack Open 2020 is that you constantly improve the apps you have built before. When your app becomes bigger, you change the file structure for a better overview. After learning how to write custom hooks, you implement them in your previously writte code.

### No Videos

This course provides you with written information on how to implement certain features. Then you build these features yourself, and after that you will complete exercises where you are asked to build a similar feature yourself, or extend on something you have build before. This is not a course where someone takes your hand and tells you what to do. But the course does provide enough information for you to be able to complete the exercises and learn a lot. Sometimes links to documentation or other information are given, so you can study that information yourself. The course only has written content, no videos, and it is self-paced.

### &#10084; &#10084; &#10084; this Course

This course, (together with part 10 React Native, which has it's own separate [review](https://github.com/l0ve2cr3ate/rate-repository-app/blob/master/README.md#course-review-part-10-react-native)) is one of my most liked courses. I had a lot of fun completing the exercises. I love that this course is not a simple walkthrough, but gives you some challenges. There is no handholding, but you don't have to feel lost either, because you will get enough information to be able to complete the exercises (sometimes after doing some research). I am also happy that the course content uses hooks, and is up-to-date. People can do pull requests to improve the course.
I like it that apart from a clear exercise description, the course also provides you with screenshots about what you should build.

### Improvements
The course uses `axios` for API request to REST API. I would be great if in the future `React Query` (Hooks for fetching, caching and updating asynchronous data in React) could be used for data fetching. You can use it with REST, GraphQL, etc.

At the moment the course was being created create-react-app probably did not yet contain a redux template, but now it is possible to initiate a redux project with the following command: `npx create-react-app my-app --template redux`. This will create an app with React and `Redux Toolkit`. The Redux Toolkit package is intended to be the standard way to write Redux logic. It would be great if the Redux Toolkit could be used in a future iteration of the course.

### Summary

I would recommend this course if you satisfy the [requirements](#prerequisits), want to go through some high quality course material and put in the effort to complete the exercises. 
If you love getting certificates, you are in the right place. If you expect video content, this course in NOT for you. If you expect a walktrough about how to build a certain app, this course is NOT for you.





