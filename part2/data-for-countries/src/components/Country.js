import React from "react";
import styles from "./Country.module.css";

const Country = ({ country, handleClick }) => (
  <div>
    <span className={styles.countryName}>{country.name}</span>
    <button className={styles.button} onClick={() => handleClick(country.name)}>
      Show
    </button>
  </div>
);

export default Country;
