import React from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";
import styles from "./Recommendations.module.css";

const Recommendations = (props) => {
  const { loading: me_loading, error: me_error, data: me } = useQuery(ME);

  const favoriteGenre = me?.me?.favoriteGenre;

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { filterByGenre: favoriteGenre },
    fetchPolicy: "no-cache",
  });

  if (!props.show) {
    return null;
  }

  if (loading || me_loading) return <p>Loading...</p>;
  if (error || me_error) return <p>Error :(</p>;

  return (
    <div>
      <h1 className={styles.header}>Recommendations</h1>
      <p className={styles.text}>Books in your favorite genre:</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {data?.allBooks?.length === 0 && !loading ? (
            <tr>
              <td>No books found in your favorite genre :(</td>
            </tr>
          ) : (
            <>
              {data?.allBooks?.map((a, i) => (
                <tr key={`${a.title}-${i}`}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
