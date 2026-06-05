import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import { formatDateRange } from "../data/mockData";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

export default function TimesheetTable({ timesheets }) {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filtered = timesheets.filter((t) => {
    if (filterStatus && filterStatus !== "ALL" && t.status !== filterStatus) return false;
    if (filterDateRange && filterDateRange !== "ALL") {
      const start = new Date(t.startDate);
      const month = start.getMonth();
      if (filterDateRange === "JAN_2024" && month !== 0) return false;
      if (filterDateRange === "FEB_2024" && month !== 1) return false;
      if (filterDateRange === "MAR_2024" && month !== 2) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  function getAction(status, id) {
    switch (status) {
      case "COMPLETED":
        return { label: "View", onClick: () => navigate(`/timesheet/${id}`) };
      case "INCOMPLETE":
        return { label: "Update", onClick: () => navigate(`/timesheet/${id}`) };
      case "MISSING":
        return { label: "Create", onClick: () => navigate(`/timesheet/${id}`) };
      default:
        return null;
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Your Timesheets</h2>
      </div>

      <div className="px-4 sm:px-6 py-3 flex flex-wrap gap-3 items-center border-b border-gray-100">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <select
            id="dateRange"
            value={filterDateRange}
            onChange={(e) => { setFilterDateRange(e.target.value); setCurrentPage(1); }}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
          >
            <option value="" disabled>Date Range</option>
            <option value="ALL">All</option>
            <option value="JAN_2024">January 2024</option>
            <option value="FEB_2024">February 2024</option>
            <option value="MAR_2024">March 2024</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
          >
            <option value="" disabled>Status</option>
            <option value="ALL">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="INCOMPLETE">Incomplete</option>
            <option value="MISSING">Missing</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                WEEK #
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                DATE
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map((ts) => {
              const action = getAction(ts.status, ts.id);
              return (
                <tr key={ts.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {ts.weekNumber}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDateRange(ts.startDate, ts.endDate)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={ts.status} />
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm">
                    {action && (
                      <button
                        onClick={action.onClick}
                        className="text-[#2563eb] hover:text-[#1d4ed8] font-semibold transition-colors"
                      >
                        {action.label}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 sm:px-6 py-8 text-center text-sm text-gray-400">
                  No timesheets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 sm:px-6 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 font-medium">Show</label>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} per page
              </option>
            ))}
          </select>
        </div>
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
