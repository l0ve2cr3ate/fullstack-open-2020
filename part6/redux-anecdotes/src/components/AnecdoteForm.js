import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import styles from "./AnecdoteForm.module.css";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    createAnecdote(content);

    setNotification(`Successfully added anecdote`, 5);
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <label htmlFor="anecdote">Anecdote</label>{" "}
        <input id="anecdote" className={styles.input} name="anecdote" />
        <button className={styles.submitBtn} type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm);
export default ConnectedAnecdoteForm;
