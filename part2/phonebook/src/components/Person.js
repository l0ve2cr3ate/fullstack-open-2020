import React from "react";

const Person = ({ person }) => (
  <div className="person">
    <span className="person--name">{person.name}</span>
    <span>{person.number}</span>
  </div>
);

export default Person;
