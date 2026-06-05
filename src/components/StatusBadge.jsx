const styles = {
  COMPLETED: "bg-green-50 text-green-700 border border-green-200",
  INCOMPLETE: "bg-amber-50 text-amber-700 border border-amber-200",
  MISSING: "bg-pink-50 text-pink-700 border border-pink-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || ""}`}
    >
      {status}
    </span>
  );
}
