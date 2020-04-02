const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.use(cors());

app.use(express.static("build"));

// Configure morgan to log body of POST request
morgan.token("person", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  return null;
});

// json-parser
app.use(express.json());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

app.get("/info", (req, res) => {
  res.send(
    `<div>
    <span>Phonebook has info for ${persons.length} people</span></div>
  <span>${new Date().toString()}</span>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    // No person found with this id
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  // Filter out the person that needs to be deleted
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const generateId = () => Number((Math.random() * 10000).toFixed(0));
  const { body } = req;

  // Error handling
  if (!body.name) {
    return res.status(400).json({
      error: "name is required"
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number is required"
    });
  }

  // Check if person is already added to the phoneboook.
  const alreadyExists = persons.some(person => person.name === body.name);
  if (alreadyExists) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
