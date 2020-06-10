import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/LoginForm";
import styles from "./App.module.css";

import Button from "./components/Button";
import { useApolloClient } from "@apollo/client";
import Recommendations from "./components/Reccommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <main>
      <div>
        <Button className={styles.menuBtn} onClick={() => setPage("authors")}>
          authors
        </Button>
        <Button className={styles.menuBtn} onClick={() => setPage("books")}>
          books
        </Button>
        {token && (
          <>
            <Button className={styles.menuBtn} onClick={() => setPage("add")}>
              add book
            </Button>
            <Button
              className={styles.menuBtn}
              onClick={() => setPage("recommendations")}
            >
              recommend
            </Button>
            <Button className={styles.menuBtn} onClick={logout}>
              logout
            </Button>
          </>
        )}
        {!token && (
          <Button className={styles.menuBtn} onClick={() => setPage("login")}>
            login
          </Button>
        )}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook setPage={setPage} show={page === "add"} />

      <Login setPage={setPage} setToken={setToken} show={page === "login"} />

      <Recommendations show={page === "recommendations"} />
    </main>
  );
};

export default App;
