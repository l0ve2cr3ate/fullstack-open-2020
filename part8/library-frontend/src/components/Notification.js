import React from "react";
import styles from "./Notification.module.css";

const Notification = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <div className={styles.error}>{errorMessage}</div>;
};

export default Notification;
