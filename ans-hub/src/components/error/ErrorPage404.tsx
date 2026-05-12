import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-24 h-24 flex items-center justify-center mb-8">
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

        <h1 className="text-9xl font-extrabold text-[#EE1C25] mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          The humanitarian assistance page you are looking for might have been
          removed, had its name changed, or is temporarily unavailable within
          the National Societies network.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-all shadow-sm"
          >
            Previous Resource
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#EE1C25] text-white font-semibold rounded hover:bg-[#d11920] transition-all shadow-sm"
          >
            Go to Hub Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage404;
