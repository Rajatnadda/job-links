import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";

import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  // ✅ Safely handle hook return
  const result = useGetAllJobs() || {};
  const { loading = false, error = null } = result;

  // ✅ Safely handle Redux state
  const jobs = useSelector((state) => state.jobs?.allJobs || []);
  const { user = null } = useSelector((store) => store.auth || {});

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-24">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-cover bg-center opacity-5 pointer-events-none"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            Find Your <span className="text-indigo-600">Dream Job</span> Today
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10">
            Discover top opportunities across tech, design, marketing, and more — tailored just for you.
          </p>
          <a
            href="#jobs"
            className="inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow hover:bg-indigo-700 transition duration-300"
          >
            Browse Jobs
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-14">
            Explore Job Categories
          </h2>
          <Categories />
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section id="jobs" className="py-20 bg-gray-50 border-t rounded-t-3xl shadow-inner">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-14">
            Latest Job Listings
          </h2>

          {loading && (
            <div className="flex justify-center items-center gap-4 py-12">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-indigo-700 text-lg font-medium">Loading jobs...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 font-semibold text-lg py-6">
              Error: {error}
            </div>
          )}

          {!loading && !error && <LatestJobs jobs={jobs} />}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
