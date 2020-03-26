import React from "react";
import WeatherData from "./WeatherData";
import Country from "./Country";
import CountryDetail from "./CountryDetail";
import styles from "./Countries.module.css";

const Countries = ({ countries, weatherData, handleClick }) => {
  if (countries.length > 10) {
    return (
      <div className={styles.message}>
        <span>Too many matches, specify another filter.</span>
      </div>
    );
  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <div className={styles.countries}>
        {countries.map(country => (
          <Country
            key={country.name}
            country={country}
            handleClick={handleClick}
          />
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div className={styles.countries}>
        {countries.map(country => (
          <CountryDetail key={country.name} country={country} />
        ))}

        <WeatherData weatherData={weatherData} />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Countries;
