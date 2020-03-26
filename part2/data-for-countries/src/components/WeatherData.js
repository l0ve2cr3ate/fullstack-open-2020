import React from "react";
import styles from "./WeatherData.module.css";

const WeatherData = ({ weatherData }) => (
  <>
    {weatherData && (
      <div>
        <h2>Weather in {weatherData?.location.name}</h2>
        <div className={styles.weatherData}>
          <span className={styles.bold}>Temperature: </span>
          <span>{weatherData?.current.temperature} &deg; Celsius</span>
        </div>
        <div>
          <img
            src={weatherData?.current.weather_icons[0]}
            alt={weatherData?.current.weather_descriptions[0]}
          />
        </div>
        <div>
          <span className={styles.bold}>Wind: </span>
          <span>{weatherData?.current.wind_speed} mph </span>
          <span>direction {weatherData?.current.wind_dir}</span>
        </div>
      </div>
    )}
  </>
);

export default WeatherData;
