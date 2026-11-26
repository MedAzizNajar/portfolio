import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function useApi(chemin) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    let annule = false;

    setLoading(true);
    setError(null);

    api(chemin)
      .then((d) => !annule && setData(d))
      .catch((e) => !annule && setError(e.message))
      .finally(() => !annule && setLoading(false));

    return () => {
      annule = true;
    };

  }, [chemin]);

  return { data, loading, error };
}