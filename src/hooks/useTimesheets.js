import { useState, useEffect } from "react";
import { timesheets } from "../data/mockData";

export function useTimesheets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(timesheets);
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return { timesheets: data, loading };
}
