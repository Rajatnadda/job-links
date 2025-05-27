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
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const applications = applicants?.applications || [];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm mb-4">
          A list of your recent applicants
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {["Full Name", "Email", "Contact", "Resume", "Date Applied", "Action"].map((header) => (
              <TableHead
                key={header}
                className={`px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-300 ${header === "Action" ? "text-right" : "text-left"}`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length > 0 ? (
            applications.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
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
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium transition"
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
                    <PopoverTrigger asChild>
                      <button
                        className="p-1 rounded-full hover:bg-gray-200 transition"
                        aria-label="Actions"
                      >
                        <MoreHorizontal size={20} className="text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 bg-white border border-gray-200 rounded-lg shadow-md p-2">
                      {shortlistingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50 cursor-pointer transition"
                        >
                          <input
                            type="radio"
                            name={`status-${item._id}`}
                            value={status}
                            className="cursor-pointer"
                            readOnly
                          />
                          <span className="text-sm text-gray-700 font-medium">{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500 italic">
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
