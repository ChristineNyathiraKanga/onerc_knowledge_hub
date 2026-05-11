import { useFrappeAuth } from "frappe-react-sdk";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useFrappeAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({
        username: credentials.username,
        password: credentials.password,
      });
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
        <div className="bg-white py-10 px-8 border-2 border-gray-100 shadow-xl rounded-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <svg
                className="w-full h-full text-[#EE1C25]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.5 12.5H62.5V37.5H87.5V62.5H62.5V87.5H37.5V62.5H12.5V37.5H37.5V12.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Society Hub
            </h2>
            <p className="text-sm font-medium text-gray-500 mt-1">
              National Societies Peer Network
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                Member ID / Email
              </label>
              <input
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleChange}
                className="block w-full rounded border-2 border-gray-100 px-4 py-3 text-sm focus:border-[#EE1C25] focus:ring-0 outline-none transition-all bg-gray-50/50 font-medium"
                placeholder="Enter your identification"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest">
                  Secure Password
                </label>
                <Link
                  to="/forgot"
                  className="text-xs font-bold text-[#EE1C25] hover:underline"
                >
                  Recovery?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full rounded border-2 border-gray-100 px-4 py-3 text-sm focus:border-[#EE1C25] focus:ring-0 outline-none transition-all bg-gray-50/50 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-tighter"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center rounded bg-[#EE1C25] py-3.5 px-4 text-sm font-bold text-white hover:bg-[#d11920] focus:outline-none transition-all shadow-md active:transform active:scale-[0.98]"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "SECURE LOGIN"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 font-medium">
              New to the network?{" "}
              <Link
                to="/signup"
                className="font-bold text-[#EE1C25] hover:underline"
              >
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
