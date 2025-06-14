import React from "react";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  return (
    <nav
      className="w-full px-8 py-5 bg-slate-100 backdrop-blur-md border-b border-gray-300 flex items-center justify-between
                 top-0 z-50 transition-shadow duration-300 ease-in-out hover:shadow-lg"
    >
      <Link
        to="/"
        className="text-2xl font-extrabold text-blue-700 hover:scale-110 transform transition-transform duration-300 ease-in-out select-none"
        aria-label="Job Link Home"
      >
        Job Link
      </Link>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="text-blue-600 font-semibold px-4 py-2 rounded-lg
                    hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md
                    transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-green-600 font-semibold px-4 py-2 rounded-lg
                    hover:bg-green-600 hover:text-white shadow-sm hover:shadow-md
                    transition-all duration-300 ease-in-out"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default LoginNavbar;
