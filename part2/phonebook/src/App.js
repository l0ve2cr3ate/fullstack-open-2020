import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import InputField from "./components/InputField";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);

  // Fetch person data from json-server
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    setFilter(event.target.value);
    const filtered = persons.filter(person =>
      // Check if the search term is included in the names in the phonebook
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredPersons(filtered);
  };

  // submit form
  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    // Check if person is already added to the phoneboook.
    const alreadyExists = persons.some(person => person.name === newName);

    // No name provided --> could be handled by displaying an error
    // For now do nothing.
    if (newName === "") {
      return;
    }

    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
    // clear input fields
    setNewName("");
    setNewNumber("");
  };

  return (
    <main className="container">
      <h1>Phonebook</h1>

      {/* Filter by name */}
      <InputField
        label="Filter shown with"
        htmlFor="filter"
        type="text"
        value={filter}
        onChange={handleFilter}
      />

      <h2>Add a new</h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        filteredPersons={filteredPersons}
      />
    </main>
  );
};

export default App;
