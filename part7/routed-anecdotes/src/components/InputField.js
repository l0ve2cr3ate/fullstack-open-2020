import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ name, value, onChange, label }) => (
  <div>
    <label className={styles.label}>{label}</label>
    <input
      className={styles.input}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
