import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ label, ...props }) => (
  <div>
    <label className={styles.label}>{label}</label>
    <input
      className={styles.input}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);

export default InputField;
