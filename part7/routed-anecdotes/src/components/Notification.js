import React from "react";
import styles from "./Notification.module.css";

const Notification = ({ notification }) => (
  <div className={styles.notification}>{notification}</div>
);

export default Notification;
