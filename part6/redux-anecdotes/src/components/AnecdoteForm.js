import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotificationMessage,
  setNotificationMessage,
} from "../reducers/notificationReducer";
import styles from "./AnecdoteForm.module.css";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));

    dispatch(
      setNotificationMessage({
        message: `Successfully added anecdote`,
      })
    );
    setTimeout(() => {
      dispatch(removeNotificationMessage());
    }, 5000);
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

export default AnecdoteForm;
