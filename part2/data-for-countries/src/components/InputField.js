import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ htmlFor, label, type, value, onChange }) => (
  <>
    <label className={styles.label} htmlFor={htmlFor}>
      {label}
    </label>
    <input
      type={type}
      className={styles.input}
      id={htmlFor}
      value={value}
      onChange={onChange}
    />
  </>
);

export default InputField;
