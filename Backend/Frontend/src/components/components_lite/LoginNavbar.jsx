import React from "react";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-300 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-700 hover:scale-105 transition-transform">
        Job Link
      </Link>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-green-600 font-medium hover:underline hover:text-green-800 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default LoginNavbar;
