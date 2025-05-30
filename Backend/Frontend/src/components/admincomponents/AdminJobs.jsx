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
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Heading */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-blue-700 tracking-tight">
            Job Management Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review, search, and manage your company’s job postings.
          </p>
        </header>

        {/* Search and Button */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Input
            type="search"
            aria-label="Search jobs by title or company"
            className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Search by job title or company..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-md shadow whitespace-nowrap"
            aria-label="Post a new job"
          >
            + Post New Job
          </Button>
        </section>

        {/* Job Listings Table */}
        <section className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <AdminJobsTable />
        </section>
      </main>
    </div>
  );
};

export default AdminJobs;
