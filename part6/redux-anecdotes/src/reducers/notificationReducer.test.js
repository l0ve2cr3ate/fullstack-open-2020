import deepFreeze from "deep-freeze";
import notificationReducer from "./notificationReducer";

const initialState = "";

describe("notification reducer", () => {
  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = notificationReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("notification is displayed", () => {
    const state = initialState;
    const action = {
      type: "SET_MESSAGE",
      data: { message: "Display notification", delay: 5 },
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(action.data);
  });

  test("notification can be removed", () => {
    const state = initialState;
    const action = {
      type: "REMOVE_MESSAGE",
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
