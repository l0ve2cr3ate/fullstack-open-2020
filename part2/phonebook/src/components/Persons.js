import React from "react";
import Person from "./Person";

const Persons = ({ filter, persons, filteredPersons }) => (
  <div className="persons">
    {filter === ""
      ? persons?.map(person => <Person key={person.name} person={person} />)
      : filteredPersons?.map(person => (
          <Person key={person.name} person={person} />
        ))}
  </div>
);

export default Persons;
