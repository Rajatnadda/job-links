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
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-violet-200 to-violet-300 text-gray-900">
      <Navbar />

      <section className="relative overflow-hidden bg-violet-600 text-white py-20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-violet-600 to-violet-500 opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Find Your <span className="text-yellow-300">Dream Job</span> Today
          </h1>
          <p className="text-lg md:text-xl mb-8 text-violet-100">
            Explore the latest opportunities in tech, design, marketing, and more.
          </p>
          <a
            href="#jobs"
            className="inline-block px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition"
          >
            Browse Jobs
          </a>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-8 text-violet-800">
            Explore Job Categories
          </h2>
          <Categories />
        </div>
      </section>

      <section id="jobs" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-8 text-violet-800">
            Latest Job Listings
          </h2>
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="ml-4 text-violet-700">Loading jobs...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-600 font-medium">
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
