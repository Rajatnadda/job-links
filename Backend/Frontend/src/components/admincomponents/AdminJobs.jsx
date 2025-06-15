import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminJobsAction } from "../../redux/actions/jobActions";
import { setAllAdminJobs, setSearchedQuery } from "../../redux/slices/jobSlice";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const { allAdminJobs: jobs, searchedQuery: searchQuery } = useSelector((state) => state.job);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(getAdminJobsAction());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(jobs)) {
      const filtered = jobs.filter((job) =>
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  }, [jobs, searchQuery]);

  const handleSearch = (e) => {
    dispatch(setSearchedQuery(e.target.value));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Job Dashboard</h2>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded w-full mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Company</th>
              <th scope="col" className="px-6 py-3">Location</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Posted</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{job.title}</td>
                  <td className="px-6 py-4">{job.company?.name || "N/A"}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.jobType}</td>
                  <td className="px-6 py-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;
