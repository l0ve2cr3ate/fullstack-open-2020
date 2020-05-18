import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (name) {
          const result = await axios(url);

          if (result) {
            const data = result.data[0];
            const found = true;
            setCountry({ data, found });
          }
        }
      } catch (error) {
        console.error(error);
        const data = null;
        const found = false;
        setCountry({ data, found });
      }

      setIsLoading(false);
    };

    fetchData();
  }, [name, url]);

  return { country, isLoading };
};

const Country = ({ country, isLoading }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.datapopulation}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, isLoading, isError } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default App;
