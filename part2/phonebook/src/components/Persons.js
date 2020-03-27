import React from "react";
import Person from "./Person";

const Persons = ({ filter, persons, filteredPersons, handleDelete }) => (
  <div className="persons">
    {filter === ""
      ? persons?.map(person => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))
      : filteredPersons?.map(person => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
  </div>
);

export default Persons;
