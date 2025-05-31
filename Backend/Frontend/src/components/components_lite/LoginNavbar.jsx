import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const LoginNavbar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className="w-full px-8 py-5 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-300 flex items-center justify-between
                      sticky top-0 z-50
                      transition-shadow duration-300 ease-in-out
                      hover:shadow-lg"
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

      {/* Flex-grow to push footer to bottom */}
      <main className="flex-grow" />

      <Footer />
    </div>
  );
};

export default LoginNavbar;
