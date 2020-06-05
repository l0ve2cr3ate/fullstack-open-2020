import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import styles from "./App.module.css";

import Button from "./components/Button";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <main>
      <div>
        <Button className={styles.menuBtn} onClick={() => setPage("authors")}>
          authors
        </Button>
        <Button className={styles.menuBtn} onClick={() => setPage("books")}>
          books
        </Button>
        <Button className={styles.menuBtn} onClick={() => setPage("add")}>
          add book
        </Button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </main>
  );
};

export default App;
