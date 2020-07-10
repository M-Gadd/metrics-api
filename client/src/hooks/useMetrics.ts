import api from "../api";
import { useState, useEffect } from "react";

export const useSubmit = (key: string) => {
  const [sumMetrics, setSumMetrics] = useState(Array);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await api.sumMetrics(key);
    setSumMetrics(response.data.sum);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { sumMetrics, isLoading };
};
