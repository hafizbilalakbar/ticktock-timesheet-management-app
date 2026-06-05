import { useState, useEffect } from "react";
import { timesheets, entries } from "../data/mockData";

export function useWeekDetail(weekId) {
  const [timesheet, setTimesheet] = useState(null);
  const [weekEntries, setWeekEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ts = timesheets.find((t) => t.id === weekId) || null;
      const es = entries.filter((e) => e.weekId === weekId);
      setTimesheet(ts);
      setWeekEntries(es);
      setLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [weekId]);

  return { timesheet, weekEntries, setWeekEntries, loading };
}
