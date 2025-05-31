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
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white py-24 shadow-md">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 text-gray-900">
            Find Your <span className="text-indigo-600">Dream Job</span> Today
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-10">
            Discover the latest opportunities across technology, design, marketing, and more. 
            Take your career to the next level with our curated listings.
          </p>
          <a
            href="#jobs"
            className="inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow hover:bg-indigo-700 transition duration-300"
            aria-label="Browse Jobs"
          >
            Browse Jobs
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Explore Job Categories
          </h2>
          <Categories />
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section
        id="jobs"
        className="py-16 max-w-6xl mx-auto px-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          Latest Job Listings
        </h2>

        {loading && (
          <div className="flex justify-center items-center space-x-4 py-12">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-700 text-lg font-medium">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 font-semibold text-lg">
            Error: {error}
          </div>
        )}

        {!loading && !error && <LatestJobs jobs={jobs} />}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
