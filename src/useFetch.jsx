import { useState, useEffect } from "react";

const useFetch = (url, initialData = null) => {
  const [finalData, setFinalData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFinalData(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);
  return { finalData, loading, error, setFinalData };
};
export default useFetch;