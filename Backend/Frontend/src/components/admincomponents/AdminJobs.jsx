import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  useGetAllAdminJobs(); // Custom hook to fetch jobs

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  // Update search text in Redux store on input change
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
            Manage Jobs
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            View, filter, and post job listings.
          </p>
        </header>

        {/* Search and Post New Job */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Input
            type="search"
            aria-label="Search jobs by title or company"
            className="md:w-1/2 border border-gray-300 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Search by job title or company name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-6 py-2 rounded-md shadow-md whitespace-nowrap"
            aria-label="Post a new job"
          >
            + Post New Job
          </Button>
        </section>

        {/* Jobs Table */}
        <section className="bg-white shadow rounded-lg p-6">
          <AdminJobsTable />
        </section>
      </main>
    </div>
  );
};

export default AdminJobs;
