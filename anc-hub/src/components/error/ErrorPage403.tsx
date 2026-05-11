import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage403: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
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

        <h1 className="text-8xl font-black text-[#EE1C25] mb-2 tracking-tighter">
          403
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          This secure resource is restricted to authorized personnel within the
          National Societies network. Please contact your coordinator for access
          rights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded hover:bg-gray-50 transition-all"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#EE1C25] text-white font-bold rounded hover:bg-[#d11920] transition-all shadow-md"
          >
            Return to Hub
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex justify-center gap-6 grayscale opacity-50">
            <div className="h-8 w-px bg-gray-300"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest self-center">
              Network Security Protocol
            </span>
            <div className="h-8 w-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage403;
