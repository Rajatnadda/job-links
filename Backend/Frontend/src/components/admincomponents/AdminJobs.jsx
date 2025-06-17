import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobByText } from "@/redux/jobSlice";
import useGetAllAdminJobs from "./useGetAllAdminJobs";

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
        {/* Search & Post Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="sm:w-1/2 w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Filter by job title or company"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            Post New Job
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
