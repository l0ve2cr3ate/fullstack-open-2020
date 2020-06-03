import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
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
