import React, { useState } from "react";
import Select from "react-select";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import styles from "./Books.module.css";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const { loading, error, data } = useQuery(ALL_BOOKS);

  let genres = data?.allBooks?.flatMap((book) => book.genres);
  // remove duplicates
  genres = [...new Set(genres)];

  const options = genres?.map((option) => {
    return {
      value: option.toLowerCase(),
      label: option,
    };
  });

  const filteredBooks = data?.allBooks?.filter((book) =>
    genre ? book.genres.includes(genre.toLowerCase()) : book
  );

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
        onChange={({ label }) => setGenre(label)}
        value={genre ? { label: genre, value: genre?.toLowerCase() } : null}
      />

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a, i) => (
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
