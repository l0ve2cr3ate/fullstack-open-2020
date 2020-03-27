import React from "react";

const Notification = ({ message, className }) => {
  // Check for null or undefined with == instead of ===
  if (message == null) {
    return null;
  }

  return <div className={className}>{message}</div>;
};

export default Notification;
