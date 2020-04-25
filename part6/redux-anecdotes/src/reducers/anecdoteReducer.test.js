import deepFreeze from "deep-freeze";
import anecdoteReducer, { getId } from "./anecdoteReducer";

describe("anecdote reducer with undefined state", () => {
  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const initialState = [];

    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});

describe("anecdote reducer with inital anecdotes", () => {
  const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    };
  };

  const initialState = anecdotesAtStart.map(asObject);

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
