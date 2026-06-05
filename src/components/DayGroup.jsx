import { useState, useRef, useEffect } from "react";

export default function DayGroup({ dayLabel, entries, onEdit, onDelete, onAddTask }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-700">{dayLabel}</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <EntryRow
            key={entry.id}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 text-sm text-[#2563eb] hover:text-[#1d4ed8] font-semibold transition-colors w-full py-2 border-2 border-dashed border-[#2563eb]/30 rounded-lg justify-center hover:border-[#2563eb]/60"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add new task
        </button>
      </div>
    </div>
  );
}

function EntryRow({ entry, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{entry.taskName}</p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm font-semibold text-gray-700">{entry.hours}h</span>

        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#dbeafe] text-[#2563eb]">
          {entry.projectName}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => { onEdit(entry); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => { onDelete(entry.id); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
