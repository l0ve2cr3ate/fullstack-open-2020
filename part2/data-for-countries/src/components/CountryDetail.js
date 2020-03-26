import React from "react";
import styles from "./CountryDetail.module.css";

const CountryDetail = ({ country }) => (
  <div className={styles.country}>
    <h1>{country.name}</h1>
    <span>Capital: {country.capital}</span>
    <span>Population: {country.population}</span>
    <h2>Languages</h2>
    {country.languages.map(language => (
      <li key={language.name}>{language.name}</li>
    ))}
    <img
      src={country.flag}
      alt={`Flag of ${country.name}`}
      width="100px"
      height="100px"
      className={styles.countryFlag}
    />
  </div>
);

export default CountryDetail;
