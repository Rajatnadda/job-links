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
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Manage Jobs</h1>
          <p className="text-gray-600 mt-1">View, filter, and post job listings.</p>
        </div>

        {/* Filter + Post Job Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <Input
            className="md:w-1/2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Search by job title or company name..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-6 py-2 rounded-md shadow-md"
          >
            + Post New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow rounded-lg p-4">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
