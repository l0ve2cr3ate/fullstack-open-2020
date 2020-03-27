import React from "react";

const Person = ({ person, handleDelete }) => (
  <div className="person">
    <span className="person--name">{person.name}</span>
    <span className="person--number">{person.number}</span>
    <button className="button" onClick={() => handleDelete(person.id)}>
      Delete
    </button>
  </div>
);

export default Person;
