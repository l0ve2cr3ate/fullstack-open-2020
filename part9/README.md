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

### Exercises part9 course-info-ts

Script to start the app: <br>
`cd part9/course-info-ts` <br>
`npm start`

Exercise 9.14 <br>
Create a new Create React App with TypeScript, and set up eslint for the project. <br>
This exercise is similar to the one you have already done in Part 1 of the course, but with TypeScript and some extra tweaks. Start off by modifying the contents of index.tsx to the following:

```javascript
import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

and remove the unnecessary files. <br>

The whole app is now in one component. That is not what we want, so refactor the code so that it consists of three components: Header, Content and Total. All data is still kept in the App component, which passes all necessary data to each component as props. Be sure to add type declarations for each component's props!

The Header component should take care of rendering the name of the course. Content should render the names of the different parts and the amount of exercises in each part, and Total should render the total sum of exercises in all parts. <br>
The App component should look somewhat like this: <br>

```javascript
const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};
```

Exercise 9.15 <br>
First add the type information to index.tsx and replace the variable courseParts with the one from the example below.

```javascript
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
];
```

Now we know that both interfaces CoursePartOne and CoursePartThree share not only the base attributes, but also an attribute called description, which is a string in both interfaces. <br>

Your first task is to to declare a new interface, that includes the description attribute and extends the CoursePartBase interface. Then modify the code so that you can remove the description attribute from both CoursePartOne and CoursePartThree without getting any errors. <br>

Then create a component Part that renders all attributes of each type of course part. Use a switch case -based exhaustive type checking! Use the new component in component Content. <br>

Lastly, add your own course part interface with at least the following attributes: name, exerciseCount and description. Then add that interface to the type union CoursePart and add corresponding data to the courseParts variable. Now if you have modified your Content component correctly, you should get an error, because you have not yet added support for the fourth course part type. Do the necessary changes to Content, so that all attributes for the new course part also get rendered and that the compiler doesn't produce any errors. <br>

Exercises 9.16.-9.18 <br>
We will soon add new type Entry for our app that represents a light weight patient journal entry. It consists of journal text i.e. description, creation date, information regarding the specialist who created it and possible diagnosis codes. Diagnosis codes map to the ICD-10 codes returned from the /api/diagnoses endpoint. Our naive implementation will be that a patient has an array of entries. <br>

Before going into this, let us do some preparatory work. <br>

9.16: patientor, step1 <br>
Create an endpoint `/api/patients/:id` that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

```javascript
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
```

Response should look like:

```javascript
{
  name: 'John Doe',
  ssn: 'kdfjsf',
  occupation: 'programmer',
  dateOfBirth: '1985-02-03',
  gender: 'male',
  entrie: [],
  id: 'sadsfsd'
}
```

9.17: patientor, step2 <br>
Create a page for showing a patient's full information in the frontend. <br>

User should be able to access a patient's information e.g by clicking the patient's name. <br>

Fetch the data from the enpoint created in the previous exercise. After fetching the patient information from the backend, add the fetched information to the application's state. Do not fetch the information if it already is in the app state, i.e. if the user is visiting the same patient's information many times.
Since we now have the state in the context, you'll need to define a new action type for updating an individual patient's data.
_Note_ that in order to access the id in the url, you need to give useParams a proper type argument:

```javascript
const { id } = useParams<{ id: string }>();
```

9.18: patientor, step3 <br>
Currently we create the action objects wherever we dispatch the actions, e.g. component App has the following:

```javascript
dispatch({
  type: "SET_PATIENT_LIST",
  payload: patientListFromApi,
});
```

Refactor the code to use action creator functions that are all defined in the file reducer.tsx.
For example the App changes like this:

```javascript
import { useStateValue, setPatientList } from "./state";

// ...

dispatch(setPatientList(patientListFromApi));
```

Exercises 9.19.-9.22 <br>

9.19: patientor, step4 <br>
Define the types OccupationalHealthCareEntry and HospitalEntry so that those conform with the new expanded example data. Ensure that your backend returns the entries properly when you go to a individual patient's route. <br>
Use types properly in the backend! For now there is no need to do a proper validation for all the fields of the entries in the backend, it is enough e.g. to check that the field type has a correct value. <br>

9.20: patientor, step5 <br>
Extend a patient's page in the frontend to list the _date, description_ and _diagnose_ codes of the patient's entries. <br>

You can use the same type definition for an Entry in the frontend. For these exercises it is enough just to copy/paste the definitions from the backend to the frontend. <br>

9.21: patientor, step6 <br>
Fetch and add diagnoses to application state from /api/diagnosis endpoint. Use the new diagnosis data to show the descriptions for patient's diagnosis codes. <br>

9.22: patientor, step7 <br>
Extend the entry-listing in the patient page to include the Entry's details with a new component that shows rest of the information of the patients entries distinguishing different types from each other.<br>
You could use eg. Icon or some other SemanticUI component the get appropriate visuals for your listing. <br>
You should use a switch case based rendering and exhaustive type checking so that no cases can be forgotten.<br>

Exercises 9.23.-9.27<br>
9.23: patientor, step8 <br>
We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so at the moment it is pretty useless as an electronic medical record. <br>

Your next task is to add an endpoint /api/patients/:id/entries to your backend, through which you can POST an entry for a patient. <br>

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type. <br>

9.24: patientor, step9 <br>
Now that our backend supports adding entries, we want to add the corresponding functionality to the frontend. In this exercise you should add a form for adding an entry to a patient. An intuitive place for accessing the form would be on a patient's page. <br>

In this exercise it is enough to support one entry type, and you do not have to handle any errors. It is enough if a new entry can be created when the form is filled with valid data. <br>

Upon a successful submit the new entry should be added to the correct patient and the patient's entries on the patient page should be updated to contain the new entry. <br>

9.25: patientor, step10 <br>
Extend your solution so that it displays an error message if some required values are missing or formatted incorrectly. <br>

9.26: patientor, step11 <br>
Extend your solution so that it supports two entry types and displays an error message if some required values are missing or formatted incorrectly. You do not need to care about the possible errors in the server's response. <br>

9.27: patientor, step12 <br>
Extend your solution so that it supports all the entry types and displays an error message if some required values are missing or formatted incorrectly. You do not need to care about the possible errors in the server's response. <br>

The easiest but surely not the most elegant way to do this exercise is to have a separate form for each different entry type. Getting the types to work properly might be a slight challenge if you use just a single form.

### Notes part 9: Typescript

#### a. Background and intro

Typescript: programming language designed for large scale JS development.

**Main Principle** <br>
Typescript is a typed superset of JS and it is compiled into plain JS. It includes all features of JS + additional features.<br>

Typescript consists of three parts:

- language: syntax, keywords & type annotations
- compiler: responsible for type info erasure & code transformation
- language service: collects type info from source code

_Compiling_ means code is transformed from human readable format to machine readable format. In typescript human readable code is transformed into other human readable code, called _transpiling_, but it is often called _compiling_. The compiler also performs static code analysis. <br>

**Typescript key language features**: <br>

- _Type Annotations_: lightweight way to record intended _contract_ of a function/variable.
- _Structural Typing_: in structural typing two elements are considered to be compatible with eachother if for each feature within the type of the first element a corresponding and identical feature exists within the type of the second element.
- _Type inference_: TS (Typescript) compiler can attempt to infer type info.
- _Type Erasure_: TS removes all type system constructs during compilation. No type info remains at runtime.

**Why should one use TS?** <br>

- Type checking and static code analysis --> can reduce runtime errors + amount of unit tests needed.
- Type annotations can function as a type of code level documentation (which is always up-to-date).
- IDEs can provide more specific & smarter intellisense when they know exactly what types of data is being processed.

**What does TS not fix?** <br>

- TS type annotations and type checking exist only on compile time, not on runtime.
- Incomplete, invalid or missing types in external libraries.
- Sometimes type inference needs assistance.
- Mysterious type errors.

#### b. First steps with Typescript

Because TS code is not executable by itself, it has to be compiled to JS. During the build step TS code is compiled into JS into a separate folder. The production environment rund the code from that folder. In development instead of a build step real-time compilation can be used for faster development experience.
`ts-node` compiles and executes TS file, so a separate compilation step is not needed. If you use `ts-node` through `package.json`, all commandline args for the script need to be prefixed with `--`: <br>
`npm run ts-node -- file.ts` <br>

**Creating Your Own Types**

```typescript
type Operation = "multiply" | "add" | "divide";
```

Using the OR operation | you can define a variable to accept multiple values by creating a _union type_.
The _type_ keyword defines a new name for a type, a _type alias_.

**@types/{npm-packages}**
Types for most packages can be found from `@types/package` and are maintained by _Definetly Typed_.
An npm package can also include its types within the code, so installing the types won't be necessary. <br>

**Note:** Typings are only used before compilation and not needed in production build. They should _always_ be in the _dev-dependencies_. <br>

`NaN` is of type number, so if you want to prevent a variable being `NaN` typescript can't help with its number type. You can validate commandline arguments like so: <br>
`!isNaN(Number(args[2]))` <br>

_Interface_ keyword: way to define the 'shape' an object should have. <br>

**More about tsconfig** <br>
`tsconfig.json` file contains core config on how TS should work in the project. You can define how strict TS should inspect your code, what file to include or exclude and where compiled files should be placed. <br>

**Adding Express to the mix** <br>
`req` and `res` parameters should be typed. When using `import from 'express'` and installing the types for express, the editor knows types, but not when using require syntax. If param is unused, prefix with `_`:
instead of `req` use `_req`. <br>

`ts-node-dev` is alternative to nodemon. Only meant to be used in development, and enables auto reloading (by taking care of compilation on every change). <br>

**The horrors of any** <br>
In TS every untyped variable which's type cannot be infered becomes implicitely any type. Implicit any typings are usually considered problematic, since it's often the result of someone forgetting to assign types --> `noImplicitAny` rule prevents this. <br>
eslint can prevent from using any type by `disallow explicit any`.

#### c. Typing the Express App

**Setting up the project** <br>
TS's native `tsc` compiler can help you initialize your project: <br>
`npm run tsc -- --init` --> will help initialize tsconfig.json. arguments before -- are interpreted for the command npm and after are for the command that is run through the script <br>

- add `tsc: tsc` script in `package.json` <br>

`tsconfig.json`:

- target: tells compiler which ECMAscript version to use for generated JS.
- outDir: where compiled code should be placed.
- module: commonjs --> can use require syntax.
- strict: shorthand for `noImplicitAny, noImplicitThis, alwaysStrict, etc.` --> suggested by official docs.
- esModuleInterop: allows interoperability between commonJS and ESModules.

For dev environment you can use `nodemon + ts-node`, `ts-node-dev` or other option. <br>
For production build use TS compiler: <br>
`npm run tsc` --> creates native runnable JS production build in build directory. <br>
With `.eslintignore` you can prevent that build directory will be linted. <br>
Script to run app in production mode: <br>
`start: node build/index.js` <br>

**Implementing the functionality** <br>
Place source code in src directory to separate it from config files. Routers are modules responsible for handling a set of specific resources, which can be placed in `src/routes` directory. <br>
Data manipulation is handled by a *service\*\*. The *business logic\** from the router code is separated into its own modules called *services\* in the `src/services` directory. Here fetching and saving data will be handled. <br>

To be able to import JSON data you will need to add: <br>
`resolveJsonModule: true` into `tsconfig` <br>

Types will be stored in `types.ts`. <br>

_Type assertion_: when you are certain a variable has a certain type but TS failed to infer correct type -->
`as string` --> only when there is no other solution. <br>

JSON files can't be typed. If you want to type JSON data you will need to change json file to ts file. Now data can be interpreted correctly and type assertion won't be necessary. <br>

Optional field on interface: <br>

```typescript
interface Props {
  something?: string;
}
```

add `?` to type declaration to make the field optional. <br>

**Node amd JSON Modules**
When using `resolveJSONModule` option in tsconfig you have to be aware that node will try to resolve modules in order of extensions: ['js', 'json', 'node', 'ts', 'tsx'] <br>
If you have a flat folder structure like: <br>

+-- myModule.json <br>
+-- myModule.ts <br>

if you want to import myModule and have `resolveJSONModule` option set to true in tsconfig `.json` file extension takes precedence over `.ts` so `myModule.json` will be imported instead of `myModule.ts`. To avoid bugs in flat file directories give each file with a valid node module extension a unique name. <br>

**Utility types** <br>
`Pick` utility type allows you to choose which fields of existing type you will want to use. It can be used to construct a new type or to inform a function what it should return on runtime. <br>
`Omit` utility type can be used to exclude fields from type. But you will have to be aware that TS only checks for the required fields. Excess fields are not prohibited. But if you will try to access a field TS is not aware off it, so it's not possible to access it. To prevent leaking of unwanted fields, you'll have to exclude the fields yourself. <br>

**Preventing accidental undefined results** <br>
Fetching one specific entry from backend with HTTP GET request to `api/diaries/:id` --> <br>

```typescript
const findById = (id: number): DiaryEntry => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};
```

--> above function could return undefined when id is not found --> change return type of the function to `DiaryEntry | undefined`: <br>

```typescript
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};
```

**Adding a new diary** <br>
POST request for adding a new dairy: <br>

```typescript
router.post('/', req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryService.addEntry(
    date,
    weather,
    visibility,
    comment
  );
  res.json(newDiaryEntry)
}

const addEntry = (date: string, weahter: Weahter, visibility: Visibility, comment: string): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    date,
    weather,
    visibility,
    comment
  }
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
}
```

--> above code is hard to read because all the params are typed separately. Possible solution: send all params as one object to addDiary function --> what is the type of the object? --> DiaryEntry with missing id field: <br>

```typescript
export type NewDiaryEntry = Omit<DiaryEntry, "id">;
```

addDiary function now becomes: <br>

```typescript
const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };
};
```

To parse incoming data json middleware is needed: <br>
`app.use(express.json)` <br>

**Proofreading requests** <br>
Express handles parsing request body by asserting any type to all body fields. If you want to use these fields, check the incoming values. You can add parsing and validation logic to utils.ts:

```typescript
const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = ...

  const isString(text: any): text is string => {
    return typeof text === 'string' || text instanceof String
  }

  const parseComment (comment: any): string => {
    if(!comment | !isString(comment)) {
      throw new Error('Incorrect or missing comment:', comment)
    }
    return comment
  }

}
```

The `isString` function in the code above is a _type guard_: a function which returns a boolean and which has a _predicate_ as return type. The general form of a type guard predicate is: <br>
`parameterName is Type` <br>

There are two different ways to create string objects in JS:

```javascript
const stringPrimitive = "String Primitive";
const stringObject = new "String object"();
typeof stringPrimitive; // --> string
typeof stringObject; // --> object
stringPrimitive instanceof String; // --> false
objectPrimitive instanceof String; // --> true
```

TS does not have a date type --> treat it like string: <br>

```typescript
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date", date);
  }

  return date;
};
```

How to validate a string is a specific form? One way would be:

```typescript
const isWeahter = (str: any): str is Weather => {
  return ['sunny', 'cloudy', ...].includes(str)
}
```

Problem: List of possible weathers does not stay in sync with the type definition if the type is altered.
Solution: enum: <br>

```typescript
export enum Weahter {
  Sunny = 'sunny',
  Cloudy = 'cloudy',
  ...
}

const isWeather = (param: any): param is Weather => {
  return object.values(Weather).includes(param)
}
```

--> now the data does not conform to types anymore, because you cannot assume a string is an enum. Fix: map initial data elements to DiaryEntry type with toDiaryEntry function: <br>

```typescript
const diaryEntries: DiaryEntry[] = data.map((obj) => {
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return obj;
});
```

Enums are usually used when there is a set of predetermined values which are not expected to change in the future (like weekdays). <br>

#### d. React with Types

TS can help catch errors:

- trying to pass extra/unwanted prop to component
- forgetting to pass required prop to component
- pass prop of wrong type to component <br>

**Create React App with TS** <br>
`npx create-react-app my-app --template typescript` <br>
Instead of .js and .jsx files, app now uses .ts and .tsx files, with some type annotations + tsconfig.json file in root directory. <br>
`allowJS: true` --> handy for if you are in the process of transforming JS project into TS. <br>
React components return `JSX.Element` or `null`, so eslint `explicit-func-return-type` rule needs to be disabled. <br>
For the linting script to parse .tsx files: <br>
`"lint": "eslint './scr/**/.{ts,tswx}'"` <br>

**React components with TS** <br>
In React you add a type for the component: `React.FunctionComponent` or `FC` alias is called a _generic_ type (<> after typename). You can pass it a type as argument. <br>

```typescript
type FC<P = {}> = FunctionComponent<P>; // --> FC is type alias for FunctionComponent interface

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): React.Element | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: partial<P>;
  displayName?: string;
}
```

`P = {}` means you can pass type as argument. The received type will be named P and is an ampty object by default. Props has generic type `PropsWithChildren`. Type `PropsWithChildren` is an _intersection_ of `P` and type `{ children?: ReactNode }`: <br>
`type PropsWithChildren<P> = P | { children?: ReactNode }` <br>

```typescript
interface WelcomeProps {
  name: string;
}

const Welcome: React.FC<WelcomeProps> = (props) => {
  return <h1>Hello, {props.name}</h1>
};

// or

const Welcome: React.FC<{name: string}> =({name}) => {
  ...
}
```

React linting rules in create-react-app expect use of prop-types. To turn this rule off add: <br>
`rules: { "react/prop-types": 0 }` to .eslintrc. <br>

**Deeper Type Usage** <br>
What if you had different course parts which would share part of their properties, like name, but also would have additional different properties (for example one has a property exercise submissionlink, but the others don't). You could create separate types for these course parts and create a union with all these types: <br>

`type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree` <br>

But this solution has a lot of duplicate type info. Solution: Identify attributes all course parts have in common. Define base type for it. Than extend base type to create specific type for parts.

```typescript
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}
```

You can use these types using a _switch_ statement:

```typescript
courseParts.forEach(part => {
  switch(part.name) {
    case 'Fundamentals':
      // TS knows this has attributes name, exerciseCount and description
      break;
      ...
  }
})
```

_Exhaustive type checking_: if you encounter an unexpected value, a function gets called that accepts a value with the type _never_ and has return type never. <br>
Helper function for exhaustive type checking: <br>

```typescript
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
```

In the default block of your switch statement: <br>

```typescript
  default:
    return assertNever(part)
```

Never type represents type of values that never occur. If you would have a course part which would not be handled by one of the switch cases, it would go to the default case and give an error: `CoursePart ... not assignable to parameter of type 'never'` --> you are using a variable where it should never be used. <br>

**A note about defining object types** <br>
In most cases you can use either _type_ or _interface_. There are some differences however: If you define multiple interfaces with the same name, they will result in a _merged_ interface. Defining multiple types with the same name will result in an error. TS docs recommend using interfaces in most cases. <br>

**Working with an existing codebase** <br>
Start by reading the README and take a look at package.json. Start app and click around to check if dev environment is functioning. Try looking at the types. Take a look at the tests. <br>

**State Handling** <br>
For small apps `useContext` and `useReducer` can be used to handle state. Redux would be overkill. The context can be used to share global data like authenticated user or theme.
Context can have a tuple containing app state and dispatcher for changing state. <br>

```typescript
export type state = { patients: { [id: string]: Patient } };
```

The state is an object with one key patients, which has a _directory_ (object with string keys), and with a Patient object as values. <br>
When a type is declared like the type for patients, TS does not actually have a way of knowing if the key you are trying to access does exist or not.

```typescript
const myPatient = state.patients["non-existing-id"];
console.log(myPatient.name); // --> no TS error because TS thinks myPatient is of type Patient
```

Fix:

```typescript
const type State = {
  patients: { [id: string]: Patient | undefined };
}
const myPatient = state.patients['non-existing-id']
console.log(myPatient.name) // --> TS error: Object possibly 'undefined'
```

This type of additional security is good to implement if you use data from external resources or use user input. A more type strict way would be to use `Map objects`, to which you can declare a type for both key and content. The Map's accessor function `get()` always returns a union of the declared value type and undefined, so TS automatically requires you to perform validity check of the data retrieved from the map: <br>

```typescript
interface State {
  patients: Map<string, Patient>;
}

const myPatient = state.patients.get("non-existing-id");
console.log(myPatient.name); // --> TS error: Object possibly 'undefined'
console.log(myPatient?.name); // --> valid code, will log 'undefined'
```

State manipulation can be done using a reducer. The action will look like: <br>

```typescript
export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };
```

The reducer: <br>

```typescript
const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => {
            ...memo, [patient.id]: patient
          }),
          ...state.patients
        }
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state;
  }
}
```

In the `state.ts` file a state and dispatch function is created, and context is set up with context provider: <br>

```typescript
const [state, dispatch] = useReducer(reducer, initialState);
```

```typescript
<StateContext.Provider value={[state, dispatch]}>
  {children}
</StateContext.Provider>
```

The `StateContext.Provider` makes state and dispatch functions available to all components by wrapping the App in it: <br>

```typescript
<StateProvider reducer={reducer}>
  <App />
</StateProvider>
```

```typescript
const useStateValue = () => useContext(StateContext);
```

The `useStateValue` hooks can be used like: <br>

```typescript
const [{ patients, dispatch }] = useStateValue();
```

in components, to access the state. <br>

The App fetches data from backend using axios. Validation functions/type guards or a validation library can be used to validate the data.

```typescript
const fetchPatients = async () => {
  try {
    const { data: patients } = await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    )
    dispatch({ type: 'SET_PATIENT_LIST', payload: patients })
  }
} // --> in useEffect
```

**WARNING**: passing type parameter to axios will not validate any data. <br>

**Full entries** <br>
There are three kind of entries:

- OccupationalHealthCare
- Hospital
- HealthCheck.

The BaseEntry type can be extended by the type mentioned above. Id, description, date and specialist are shared by all entries. diagnosisCodes in optional property. <br>

```typescript
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses["code"]>;
}
```

Entries of type HealthCheck contain HealthCheckRating field (integer from 0-3) --> enum: <br>

```typescript
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;
```

**Add Patient Form** <br>
Formik helps with handling forms in React. It helps with:

- getting values in and out of form state
- validation and error messages
- handling form submission <br>

The patient form values are typed as a version of Patient type, without id (which comes from the backend) and entries (only for existing patients):

```typescript
export type PatientFormValues = Omit<Patient, "id" | "entries">;
```

The props of the FormComponent are typed as: <br>

```typescript
interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}
```

`onSubmit` sends HTTP POST request to server and adds patient returned from backend to app state. <br><br>

For more info about exercises 9.1-9.7 see: https://fullstackopen.com/en/part9/first_steps_with_typescript <br>
For more info about exercises 9-8-9.13 see: https://fullstackopen.com/en/part9/typing_the_express_app <br>
For more info about exercises 9.14-9.27 see: https://fullstackopen.com/en/part9/react_with_types <br>
