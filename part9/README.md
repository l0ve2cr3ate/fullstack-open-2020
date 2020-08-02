### Solutions for part9 - Typescript

The exercises for part9 are divided into subparts. You can find the solutions for the subparts in their respective directories.

### Excersises part9 body-mass-index

Scripts for part body-mass-index
To start express server in production mode:
`cd part9/body-mass-index` <br>
`npm start` <br>

To start express server in development mode:
`cd part9/body-mass-index` <br>
`npm run dev` <br>

Exercises 9.1.-9.3 <br/>
9.1 Body mass index <br />
Create the code of this exercise to file bmiCalculator.ts <br/>

Write a function calculateBmi that counts BMI based on given weight (in kilograms) and height (in centimeters) and then returns a message that suits the results. <br />

Call the function in the same file with hard-coded parameters and print out the result. The code

```javascript
console.log(calculateBmi(180, 74));
```

should print the following message

`Normal (healthy weight)` <br/>
Create a npm script for running the program with command `npm run calculateBmi` <br/>

9.2 Exercise calculator <br>
Create the code of this exercise to file exerciseCalculator.ts <br>

Write a function calculateExercises that calculates the average time of daily exercise hours and compares it to the target amount of daily hours and returns an object that includes the following values:

- the number of days
- the number of training days
- the original target value
- the calculated average time
- boolean value describing if the target was reached
- a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
- a text value explaining the rating

The daily exercise hours are given to the function as an array that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training at Monday, none at Tuesday, 2 hours at Wednesday, 4.5 hours at Thursday and so on would be represented by the following array:

`[3, 0, 2, 4.5, 0, 3, 1]` <br>
For the Result object you should create an interface.

If you would call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2 it could return

```javascript
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
```

Create a npm script npm run calculateExercises for calling the function with hard coded values. <br>

9.3 Command line<br>
Change the previous exercises so that you can give the parameters of bmiCalculator and exerciseCalculator as command line arguments. <br>

Your program could work eg. as follows:

```javascript
$ npm run calculateBmi 180 91

Overweight
```

and

```javascript
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 }
```

In the example the first argument is the target value. <br>

Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input. <br>

Exercises 9.4.-9.5 <br>
9.4 Express <br>
Add express to your dependencies and create a HTTP GET endpoint hello that answers 'Hello Full Stack!'

The web app should be started with command `npm start` in production mode and `npm run dev` in development mode that should use ts-node-dev to run the app. <br>

Replace also your existing tsconfig.json file with the following content:

```
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
  }
}
```

make sure there are not any errors! <br>

9.5 WebBMI <br>
Add an endpoint for BMI-calculator that can be used by doing a HTTP GET request to endpoint bmi and specifying the input with query string parameters. For example to get bmi for a person having height 180 and weight 72, the url is http://localhost:3002/bmi?height=180&weight=72 <br>

The response is a json of the form

```javascript
{
  weight: 72,
  height: 180,
  bmi: "Normal (healthy weight)"
}
```

If the query parameters of the request are of the wrong type or missing, response with proper status code and error message are given

```
{
  error: "malformatted parameters"
}
```

Exercises 9.6.-9.7 <br>
9.6 Eslint <br>
Configure your project to use the above eslint settings and fix all the warnings. <br>

9.7 WebExercises
Add an endpoint to your app for the exercise calculator. It should be used by doing a HTTP POST request to endpoint exercises with the input in the request body

```javascript
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

Response is a json of the following form

```javascript
{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}
```

If the body of the request is not of the right form, response with proper status code and error message is given. The error message is either

```javascript
{
  error: "parameters missing";
}
```

or

```javascript
{
  error: "malformatted parameters";
}
```

depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertable to numbers. <br>

In this exercise you might find it beneficial to use the explicit any type when handling the data in the request body. Our eslint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

```
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

### Excersises part9 patientor-backend

Scripts for part patientor-backend <br>
To start express server in production mode: <br>
`cd part9/patientor-backend` <br>
`npm run tsc` (to create build folder) <br>
`npm start` <br>

To start express server in development mode: <br>
`cd part9/patientor-backend` <br>
`npm run dev` <br>

Script for patientor-frontend: <br>
`cd part9/patientor-frontend` <br>
`npm start`

Exercises 9.8.-9.9 <br>
For this set of exercises you will be developing a backend for an existing project called Patientor which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.
The frontend has already been built by outsider experts and your task is to create a backend to support the existing code.

9.8: Patientor backend, step1 <br>
Initialise project that will be used by the frontend. Configure eslint and tsconfig with the same configurations that are used in the material. Define an endpoint that responses to HTTP GET requests to route /ping.

The project should be runnable with npm scripts both in development mode and as compiled code in production mode. <br>

9.9: Patientor backend, step2 <br>
Fork and clone the project patientor. Start the project with the help of the README file. You should be able to use the frontend without a functioning backend.

Ensure that backend answers to the ping request that frontend has made on startup. Check developer tool to make sure it really works. <br>

Exercises 9.10.-9.11 <br>
Similarly to Ilari's flight service, we do not use a real database in our app but instead use hardcoded data, that is in the files diagnoses.json and patients.json. Get the files and store those into a directory called data under your project. All data modification can be done in runtime memory, so during this part it is not necessary to write to a file. <br>

9.10: Patientor backend, step3 <br>
Create a type Diagnose and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully named directories and files.

Note that diagnoses may or may not contain the field latin. <br>

9.11: Patientor backend, step4 <br>
Create data type Patient and set up a GET-endpoint /api/patients that returns all patients to the frontend excluding field ssn. Use a utility type to make sure you are selecting and returning only the wanted fields.

In this exercise you may assume that field gender has type string. <br>
Try the endpoint with browser and ensure that ssn is not included in the response. <br>
After creating the endpoint, ensure that the frontend shows the list of patients. <br>

Exercises 9.12.-9.13 <br>
9.12: Patientor backend, step5 <br>
Create a POST-endpoint /api/patients for adding patients. Ensure that you can add patients also from the frontend. <br>

9.13: Patientor backend, step6 <br>
Set up safe parsing, validation and type guards to the POST /api/patients request. <br>
Refactor the Gender field to use an enum type. <br>

For more info about exercises 9.1-9.7 see: https://fullstackopen.com/en/part9/first_steps_with_typescript
For more info about exercises 9-8-9.13 see: https://fullstackopen.com/en/part9/typing_the_express_app
