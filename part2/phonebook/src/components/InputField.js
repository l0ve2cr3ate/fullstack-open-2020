import React from "react";

const InputField = ({ htmlFor, label, type, value, onChange }) => (
  <div>
    {/* Add label with htmlFor for accessibility, id on input associates label with input element */}
    <label className="label" htmlFor={htmlFor}>
      {label}
    </label>
    <input
      type={type}
      className="input"
      id={htmlFor}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
