import deepFreeze from "deep-freeze";
import anecdoteReducer, { initialState } from "./anecdoteReducer";

describe("anecdote reducer", () => {
  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("anecdote can be voted", () => {
    const idForVoting = initialState[0].id;

    const action = {
      type: "VOTE",
      data: { id: idForVoting },
    };
    const state = initialState;

    const votedAnecdote = state.find((anecdote) => anecdote.id === idForVoting);
    const updatedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    };
    const updatedState = state.map((anecdote) =>
      anecdote.id !== idForVoting ? anecdote : updatedAnecdote
    );

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual(updatedState);
  });

  test("new anecdote can be added", () => {
    const action = {
      type: "NEW_ANECDOTE",
      data: {
        content: "Newly created anecdote",
        id: 7564829,
        votes: 0,
      },
    };
    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual([
      ...state,
      {
        content: "Newly created anecdote",
        id: 7564829,
        votes: 0,
      },
    ]);
  });
});
