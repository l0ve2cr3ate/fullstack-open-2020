import React from "react";
import { connect } from "react-redux";
import styles from "./Notification.module.css";

const Notification = ({ notification }) => {
  return (
    <>
      {notification && (
        <div className={styles.notification}>{notification}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
