import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, className, type, onClick }) => (
  <button
    onClick={onClick}
    type={type}
    className={`${styles.btn} ${className}`}
  >
    {children}
  </button>
);

export default Button;
