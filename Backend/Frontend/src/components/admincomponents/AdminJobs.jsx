import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs, setSearchJobByText } from "../../redux/jobSlice";
import axios from 'axios';
import { Link } from "react-router-dom";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.allAdminJobs);
  const searchQuery = useSelector((state) => state.job.searchJobByText);
  const [loading, setLoading] = useState(true);

  const fetchAdminJobs = async () => {
    try {
      const { data } = await axios.get("/api/job/admin-jobs");
      dispatch(setAllAdminJobs(data.jobs));
    } catch (error) {
      console.error("Error fetching admin jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminJobs();
  }, []);

  const filteredJobs = Array.isArray(jobs)
  ? jobs.filter((job) =>
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Job Management Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Review, search, and manage your company’s job postings.
      </p>

      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchJobByText(e.target.value))}
          className="border rounded px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <Link to="/admin/jobs/create">
          <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            + Post New Job
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-semibold">Company Name</th>
              <th className="px-4 py-2 font-semibold">Role</th>
              <th className="px-4 py-2 font-semibold">Date</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Loading jobs...
                </td>
              </tr>
            ) : filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center italic text-gray-500 py-6">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job._id} className="border-t">
                  <td className="px-4 py-2">{job.company?.name || "N/A"}</td>
                  <td className="px-4 py-2">{job.title}</td>
                  <td className="px-4 py-2">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/jobs/${job._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;
