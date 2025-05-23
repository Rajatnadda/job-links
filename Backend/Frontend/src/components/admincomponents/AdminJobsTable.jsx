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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filteredJobs = (allAdminJobs || []).filter((job) => {
      if (!searchJobByText) return true;
      return (
        job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
        <TableCaption className="text-sm text-gray-500 py-4">
          Your recently posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="font-semibold">Company Name</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500 py-4">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="text-gray-800">
                  {job?.company?.name || "—"}
                </TableCell>
                <TableCell className="text-gray-800">{job.title}</TableCell>
                <TableCell className="text-gray-600">
                  {job.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="text-gray-600 hover:text-blue-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white shadow-lg border rounded-md p-2 text-sm">
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Applicants</span>
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
