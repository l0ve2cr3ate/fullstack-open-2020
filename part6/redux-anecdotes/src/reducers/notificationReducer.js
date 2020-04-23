const initialState = { message: "" };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.data.message;
    case "REMOVE_MESSAGE":
      return initialState;
    default:
      return state;
  }
};

export const setNotificationMessage = (message) => {
  return {
    type: "SET_MESSAGE",
    data: { message },
  };
};

export const removeNotificationMessage = (message) => {
  return {
    type: "REMOVE_MESSAGE",
  };
};

export default notificationReducer;
