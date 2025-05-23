import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full overflow-x-auto">
      <Table className="min-w-full border-collapse border border-gray-200">
        <TableCaption className="text-gray-500 text-sm mb-4">
          A list of your recent applicants
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-left text-gray-700 px-4 py-3 font-semibold text-sm border-b border-gray-300">
              Full Name
            </TableHead>
            <TableHead className="text-left text-gray-700 px-4 py-3 font-semibold text-sm border-b border-gray-300">
              Email
            </TableHead>
            <TableHead className="text-left text-gray-700 px-4 py-3 font-semibold text-sm border-b border-gray-300">
              Contact
            </TableHead>
            <TableHead className="text-left text-gray-700 px-4 py-3 font-semibold text-sm border-b border-gray-300">
              Resume
            </TableHead>
            <TableHead className="text-left text-gray-700 px-4 py-3 font-semibold text-sm border-b border-gray-300">
              Date Applied
            </TableHead>
            <TableHead className="text-right text-gray-700 px-4 py-3 font-semibold text-sm border-b border-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition-colors duration-150 cursor-default"
              >
                <TableCell className="px-4 py-3 border-b border-gray-200 text-gray-800">
                  {item?.applicant?.fullname || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200 text-blue-600 underline break-words max-w-xs">
                  {item?.applicant?.email || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200 text-gray-800">
                  {item?.applicant?.phoneNumber || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200 text-gray-600">
                  {item?.applicant?.createdAt
                    ? new Date(item.applicant.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        aria-label="More actions"
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <MoreHorizontal size={20} className="text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                      {shortlistingStatus.map((status, index) => (
                        <label
                          key={index}
                          htmlFor={`status-${item._id}-${status}`}
                          className="flex items-center space-x-2 p-2 hover:bg-indigo-50 rounded cursor-pointer transition-colors"
                          onClick={() => statusHandler(status, item._id)}
                        >
                          <input
                            id={`status-${item._id}-${status}`}
                            type="radio"
                            name={`shortlistingStatus-${item._id}`}
                            value={status}
                            className="cursor-pointer"
                          />
                          <span className="text-gray-700 font-medium">{status}</span>
                        </label>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-gray-500 italic"
              >
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
