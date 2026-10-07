import { useState, useEffect } from "react";

const URL_API = "http://localhost:3000/api/";

export const useFetch = (endPoint = "", options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingData = async (formData = null) => {
    setIsLoading(true);
    setError(null);

    const url = `${URL_API}${endPoint}`;

    const fetchOptions = {
      credentials: "include",
      ...options,
    };

    if (formData) {
      fetchOptions.body = JSON.stringify(formData);
    }

    try {
      const res = await fetch(url, fetchOptions);
      const data = await res.json();

      if (!res.ok) {
        // throw new Error(data || `Error HTTP: ${res.status}`);
        setError(data);
        setData(null);
        return null;
      }

      setData(data);
      return data;
    } catch (err) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const method = options.method ? options.method.toUpperCase() : "GET";
    if (endPoint && method === "GET") {
      fetchingData();
    }
  }, [endPoint]);

  return { data, isLoading, error, fetchingData };
};
