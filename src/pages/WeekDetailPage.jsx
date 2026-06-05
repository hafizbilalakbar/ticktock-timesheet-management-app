import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import DayGroup from "../components/DayGroup";
import EntryModal from "../components/EntryModal";
import { useWeekDetail } from "../hooks/useWeekDetail";

export default function WeekDetailPage() {
  const { weekId } = useParams();
  const navigate = useNavigate();
  const { timesheet, weekEntries, setWeekEntries, loading } = useWeekDetail(weekId);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [addTargetDate, setAddTargetDate] = useState("");

  const groupedEntries = weekEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = { dayLabel: entry.dayLabel, entries: [] };
    }
    acc[entry.date].entries.push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEntries).sort();

  function handleEdit(entry) {
    setEditingEntry(entry);
    setAddTargetDate("");
    setModalOpen(true);
  }

  function handleDelete(entryId) {
    setWeekEntries((prev) => prev.filter((e) => e.id !== entryId));
  }

  function handleAddTask(date, dayLabel) {
    setEditingEntry(null);
    setAddTargetDate(date);
    setModalOpen(true);
  }

  const handleSubmit = useCallback(
    (data) => {
      if (editingEntry) {
        setWeekEntries((prev) =>
          prev.map((e) =>
            e.id === editingEntry.id ? { ...e, ...data } : e
          )
        );
      } else {
        const newEntry = {
          id: `entry-${Date.now()}`,
          weekId,
          date: addTargetDate,
          dayLabel: groupedEntries[addTargetDate]?.dayLabel || addTargetDate,
          ...data,
        };
        setWeekEntries((prev) => [...prev, newEntry]);
      }
      setModalOpen(false);
      setEditingEntry(null);
      setAddTargetDate("");
    },
    [editingEntry, addTargetDate, weekId, groupedEntries, setWeekEntries]
  );

  const MAX_HOURS = 40;
  const loggedHours = weekEntries.reduce((sum, e) => sum + e.hours, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!timesheet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Timesheet not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Timesheets
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                This week&apos;s timesheet
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                {timesheet.startDate} - {timesheet.endDate}
              </p>
            </div>
            <div className="sm:w-64">
              <ProgressBar logged={loggedHours} total={MAX_HOURS} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sortedDates.map((date) => (
            <DayGroup
              key={date}
              dayLabel={groupedEntries[date].dayLabel}
              entries={groupedEntries[date].entries}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddTask={() => handleAddTask(date, groupedEntries[date].dayLabel)}
            />
          ))}
          {sortedDates.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
              <p className="text-sm text-gray-400 font-medium">
                No entries yet for this week.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <EntryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEntry(null);
          setAddTargetDate("");
        }}
        onSubmit={handleSubmit}
        editingEntry={editingEntry}
      />
    </div>
  );
}
