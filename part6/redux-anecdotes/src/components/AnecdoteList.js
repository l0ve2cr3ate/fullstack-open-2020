import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
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

  const vote = (votedAnecdote) => {
    dispatch(voteAnecdote(votedAnecdote));

    dispatch(
      setNotification({ message: `You voted ${votedAnecdote.content}` }, 5)
    );
  };
  return (
    <>
      {anecdotes
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
          <div className={styles.anecdoteContainer} key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div className={styles.voteContainer}>
              <span className={styles.numVotes}>has {anecdote.votes}</span>
              <button className={styles.voteBtn} onClick={() => vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
