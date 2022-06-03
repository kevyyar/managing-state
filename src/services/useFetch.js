import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [hasErrored, setHasErrored] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (error) {
        setHasErrored(error);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [url]);

  return {
    data,
    hasErrored,
    isLoading,
  };
}
