import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);

    useEffect(() => {
      const data = async () => {
        setLoading(true);
        try {
          const response = await fetch(url);
          const result = await response.json();
          console.log(result);
          setResult(result);
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      };

      data;
    }, [url]);

    return { error, loading, result };
  }, [url]);

  return { data, loading, error };
};
