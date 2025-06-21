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
  const applications = applicants?.applications || [];

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
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg font-medium">
        No applicants found for this job.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-base font-semibold text-gray-600 mb-2">
          Users who applied for this job
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-100">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((item) => (
            <TableRow key={item._id} className="hover:bg-indigo-50">
              <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
              <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-indigo-600 underline hover:text-indigo-800"
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {item?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="text-gray-600 hover:text-gray-800">
                    <MoreHorizontal className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item._id)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded"
                      >
                        <input
                          type="radio"
                          name={`status-${item._id}`}
                          value={status}
                          className="cursor-pointer"
                        />
                        <label className="cursor-pointer text-sm">{status}</label>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
