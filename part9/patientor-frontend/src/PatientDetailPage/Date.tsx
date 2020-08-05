import React from "react";
import styles from "./Date.module.css";

interface DateProps {
  children: React.ReactNode;
}

const Date: React.FC<DateProps> = ({ children }) => (
  <span className={styles.date}>{children}</span>
);

export default Date;
