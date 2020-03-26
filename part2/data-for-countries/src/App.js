import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import InputField from "./components/InputField";
import Countries from "./components/Countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch country data from api
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      if (query !== "") {
        const searchResult = response.data.filter(country =>
          country.name.toLowerCase().includes(query.toLowerCase())
        );
        setCountries(searchResult);
      }
    });
  }, [query]);

  // Fetch weather info from api
  useEffect(() => {
    const baseUrl = "http://api.weatherstack.com/current";
    const ACCESS_KEY = process.env.REACT_APP_API_KEY;
    if (countries.length === 1) {
      const capital = countries.map(country => country.capital);
      if (capital[0]) {
        axios
          .get(`${baseUrl}?access_key=${ACCESS_KEY}&query=${capital[0]}`)
          .then(response => {
            setWeatherData(response.data);
          });
      }
    }
  }, [countries]);

  const handleSearchChange = event => {
    setQuery(event.target.value);
  };

  const handleClick = countryName => {
    setQuery(countryName);
  };

  return (
    <main className="App">
      {/* Search for country data by name */}
      <InputField
        htmlFor="search"
        type="text"
        label="Find countries"
        value={query}
        onChange={handleSearchChange}
      />
      <Countries
        handleClick={handleClick}
        countries={countries}
        weatherData={weatherData}
      />
    </main>
  );
};

export default App;
