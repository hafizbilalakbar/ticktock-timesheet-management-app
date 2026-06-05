export default function ProgressBar({ logged, total }) {
  const percentage = total > 0 ? Math.round((logged / total) * 100) : 0;

  let barColor = "bg-red-500";
  let textColor = "text-red-600";
  if (percentage >= 80) {
    barColor = "bg-green-500";
    textColor = "text-green-600";
  } else if (percentage >= 50) {
    barColor = "bg-orange-500";
    textColor = "text-orange-600";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-gray-700">
          {logged}/{total} hrs
        </span>
        <span className={`text-sm font-bold ${textColor}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
