import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription, useLazyQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import styles from "./App.module.css";
import Button from "./components/Button";
import Recommendations from "./components/Reccommendations";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [genre, setGenre] = useState("");

  const client = useApolloClient();

  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "network-only",
  });

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
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

      <Books
        show={page === "books"}
        genre={genre}
        setGenre={setGenre}
        getBooks={getBooks}
        result={result}
      />

      <NewBook
        errorMessage={errorMessage}
        updateCacheWith={updateCacheWith}
        setPage={setPage}
        show={page === "add"}
        setError={notify}
        resetFilterByGenre={setGenre}
        getBooks={getBooks}
      />

      <LoginForm
        errorMessage={errorMessage}
        setPage={setPage}
        setToken={setToken}
        show={page === "login"}
        setError={notify}
      />

      <Recommendations show={page === "recommendations"} />
    </main>
  );
};

export default App;
