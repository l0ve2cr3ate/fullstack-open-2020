import React from "react";
import InputField from "./InputField";

const Form = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={onSubmit}>
    <InputField
      label="Name:"
      htmlFor="name"
      type="text"
      value={newName}
      onChange={handleNameChange}
    />

    <InputField
      label="Number:"
      htmlFor="number"
      value={newNumber}
      onChange={handleNumberChange}
    />
    <div>
      <button className="button submit" type="submit">
        Add
      </button>
    </div>
  </form>
);

export default Form;
