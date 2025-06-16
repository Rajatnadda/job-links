import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs, setSearchJobByText } from "../../redux/jobSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { JOB_API_ENDPOINT } from "@/utils/data";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.job.allAdminJobs);
  const searchQuery = useSelector(state => state.job.searchJobByText);
  const [loading, setLoading] = useState(true);

  const fetchAdminJobs = async () => {
    try {
      const { data } = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
        withCredentials: true,
      });
      dispatch(setAllAdminJobs(data.jobs));
    } catch (err) {
      console.error("Error fetching admin jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdminJobs(); }, []);

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Job Management</h1>
        <Link to="/admin/jobs/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">+ Post Job</Link>
      </header>
      <div className="flex gap-4 mb-4">
        <input
          type="search"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={e => dispatch(setSearchJobByText(e.target.value))}
          className="flex-grow border rounded p-2"
        />
      </div>
      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Company</th>
              <th className="p-3">Role</th>
              <th className="p-3">Posted</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-6 text-center text-gray-500">Loading...</td></tr>
            ) : filteredJobs.length === 0 ? (
              <tr><td colSpan="4" className="p-6 text-center italic text-gray-500">No jobs found</td></tr>
            ) : filteredJobs.map(job => (
              <tr key={job._id} className="border-t">
                <td className="p-3">{job.company?.name}</td>
                <td className="p-3">{job.title}</td>
                <td className="p-3">{new Date(job.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <Link to={`/admin/jobs/${job._id}/applicants`} className="text-blue-600 hover:underline">Applicants</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;
