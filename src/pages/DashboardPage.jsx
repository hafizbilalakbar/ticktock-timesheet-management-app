import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TimesheetTable from "../components/TimesheetTable";
import { useTimesheets } from "../hooks/useTimesheets";

export default function DashboardPage() {
  const { timesheets, loading } = useTimesheets();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <TimesheetTable timesheets={timesheets} />
        <Footer />
      </main>
    </div>
  );
}
