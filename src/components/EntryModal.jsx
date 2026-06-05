import { useState, useEffect } from "react";
import { PROJECTS, WORK_TYPES } from "../data/mockData";

export default function EntryModal({ isOpen, onClose, onSubmit, editingEntry }) {
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("Bug fixes");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEntry) {
      setTaskName(editingEntry.taskName || "");
      setProjectName(editingEntry.projectName || "");
      setTypeOfWork(editingEntry.typeOfWork || "Bug fixes");
      setDescription(editingEntry.description || "");
      setHours(editingEntry.hours || 1);
    } else {
      setTaskName("");
      setProjectName("");
      setTypeOfWork("Bug fixes");
      setDescription("");
      setHours(1);
    }
    setErrors({});
  }, [editingEntry, isOpen]);

  function validate() {
    const newErrors = {};
    if (!taskName.trim()) newErrors.taskName = "Task name is required";
    if (!projectName.trim()) newErrors.projectName = "Project is required";
    if (!typeOfWork.trim()) newErrors.typeOfWork = "Type of work is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (hours < 0.5) newErrors.hours = "Minimum 0.5 hours";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ taskName, projectName, typeOfWork, description, hours });
  }

  function adjustHours(delta) {
    setHours((prev) => Math.max(0.5, Math.min(24, prev + delta)));
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {editingEntry ? "Edit Entry" : "Add New Entry"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Task name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            />
            {errors.taskName && <p className="mt-1 text-xs text-red-500">{errors.taskName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Select Project <span className="text-red-500">*</span>
            </label>
            <select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            >
              <option value="">Project Name</option>
              {PROJECTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.projectName && <p className="mt-1 text-xs text-red-500">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Type of Work <span className="text-red-500">*</span>
            </label>
            <select
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
            >
              {WORK_TYPES.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            {errors.typeOfWork && <p className="mt-1 text-xs text-red-500">{errors.typeOfWork}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] resize-none"
              placeholder="Write text here ..."
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            <p className="mt-1 text-xs text-gray-400 italic">A note for extra info</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustHours(-0.5)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(0.5, Math.min(24, Number(e.target.value))))}
                step={0.5} min={0.5} max={24}
                className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
              />
              <button
                type="button"
                onClick={() => adjustHours(0.5)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
              >
                +
              </button>
            </div>
            {errors.hours && <p className="mt-1 text-xs text-red-500">{errors.hours}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-bold hover:bg-[#1d4ed8] transition-colors shadow-sm"
            >
              {editingEntry ? "Update entry" : "Add entry"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
