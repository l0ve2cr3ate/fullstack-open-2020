import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import styles from "./AnecdoteList.module.css";

const AnecdoteList = ({ filter, anecdotes, voteAnecdote, setNotification }) => {
  const anecdotesToShow = () => {
    if (filter.filter === "") return anecdotes;

    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  };

  const vote = (votedAnecdote) => {
    voteAnecdote(votedAnecdote);

    setNotification(`You voted ${votedAnecdote.content}`, 5);
  };
  return (
    <>
      {anecdotesToShow()
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

const mapStateToProps = ({ anecdotes, filter }) => {
  return {
    anecdotes,
    filter,
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  setNotification,
})(AnecdoteList);
export default ConnectedAnecdoteList;
