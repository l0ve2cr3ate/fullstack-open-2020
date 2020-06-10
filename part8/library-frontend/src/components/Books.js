import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ALL_BOOKS } from "../queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import styles from "./Books.module.css";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const { loading, error, data } = useQuery(ALL_BOOKS);

  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getBooks();
  }, []); //eslint-disable-line

  let genres = data?.allBooks?.flatMap((book) => book.genres);
  // remove duplicates
  genres = [...new Set(genres)];

  const options = genres?.map((option) => {
    return {
      value: option.toLowerCase(),
      label: option,
    };
  });

  const books = result?.data?.allBooks
    ? result?.data?.allBooks
    : data?.allBooks;

  const handleChange = (data) => {
    const label = data?.label;
    setGenre(label);

    getBooks({
      variables: { filterByGenre: label },
    });
  };

  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1 className={styles.header}>Books</h1>

      <label className={styles.filterLabel}>Filter by genre: </label>
      <Select
        placeholder="Select genre..."
        className={styles.select}
        options={options}
        onChange={handleChange}
        value={genre ? { label: genre, value: genre?.toLowerCase() } : null}
        isClearable
      />

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a, i) => (
            <tr key={`${a.title}-${i}`}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
