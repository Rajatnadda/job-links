import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filtered = (allAdminJobs || []).filter((job) => {
      if (!searchJobByText) return true;
      const text = searchJobByText.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(text) ||
        job?.company?.name?.toLowerCase().includes(text)
      );
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <Table className="min-w-full text-sm">
        <TableCaption className="text-gray-500 text-sm mb-2">
          Your recently posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="px-4 py-3 font-semibold">Company Name</TableHead>
            <TableHead className="px-4 py-3 font-semibold">Role</TableHead>
            <TableHead className="px-4 py-3 font-semibold">Date</TableHead>
            <TableHead className="px-4 py-3 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6 italic">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-3 text-gray-800">
                  {job?.company?.name || "—"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-800">
                  {job?.title || "—"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-600">
                  {job?.createdAt ? job.createdAt.split("T")[0] : "—"}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        aria-label="Job actions"
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 bg-white border border-gray-300 rounded-md shadow-md p-2">
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                        className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-800">Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-gray-800">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
