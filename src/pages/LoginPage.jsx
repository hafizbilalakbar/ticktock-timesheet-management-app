import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Form (White) */}
      <div className="w-full lg:w-1/2 min-h-[auto] lg:min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-12 lg:py-0 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Welcome back
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full h-12 sm:h-14 border border-gray-300 rounded-lg px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full h-12 sm:h-14 border border-gray-300 rounded-lg px-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#165DFF]/20 focus:border-[#165DFF] transition-all"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-[#165DFF] border-gray-300 rounded focus:ring-[#165DFF]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 font-medium">
                Remember me
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 sm:h-14 bg-[#165DFF] text-white rounded-lg px-4 text-sm sm:text-base font-semibold hover:bg-[#144bd6] focus:outline-none focus:ring-2 focus:ring-[#165DFF]/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      {/* Right - Branding (Blue #165DFF) */}
      <div className="w-full lg:w-1/2 min-h-[auto] lg:min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-0 bg-[#165DFF]">
        <div className="w-full md:max-w-[650px] mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
            ticktock
          </h2>
          <p className="text-white/80 sm:text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
