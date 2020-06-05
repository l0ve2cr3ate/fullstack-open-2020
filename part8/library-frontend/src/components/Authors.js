import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear";
import styles from "./Authors.module.css";

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  const options = data?.allAuthors?.map((option) => {
    return {
      value: option.name.toLowerCase(),
      label: option.name,
    };
  });

  if (!props.show) {
    return null;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1 className={styles.header}>Authors</h1>

      <table>
        <tbody>
          <tr>
            <th className={styles.name}>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td className={styles.bookCount}>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetBirthYear options={options} />
    </div>
  );
};

export default Authors;
