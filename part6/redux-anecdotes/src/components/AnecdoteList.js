import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotificationMessage,
  removeNotificationMessage,
} from "../reducers/notificationReducer";
import styles from "./AnecdoteList.module.css";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter.filter === "") return state.anecdotes;

    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(state.filter.filter.toLowerCase())
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(
      setNotificationMessage({ message: `You voted ${votedAnecdote.content}` })
    );
    setTimeout(() => {
      dispatch(removeNotificationMessage());
    }, 5000);
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div className={styles.anecdoteContainer} key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div className={styles.voteContainer}>
            <span className={styles.numVotes}>has {anecdote.votes}</span>
            <button
              className={styles.voteBtn}
              onClick={() => vote(anecdote.id)}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
