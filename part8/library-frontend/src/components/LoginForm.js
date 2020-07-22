import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import Button from "./Button";
import Input from "./Input";
import styles from "./LoginForm.module.css";
import Notification from "./Notification";

const LoginForm = ({ setPage, setToken, show, setError, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setPage("authors");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">username</label>
          <Input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">password</label>
          <Input
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
