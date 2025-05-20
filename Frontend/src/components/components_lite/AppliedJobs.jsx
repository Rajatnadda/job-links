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
import { Badge } from "../ui/badge";

const AppliedJobs = () => {
  return (
    <div>
      Applied Jobs
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TableRow key={index}>
              <TableCell>12-12-2012</TableCell>
              <TableCell>Sotware Engineer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell className="text-right">
                <Badge>Rejected</Badge>{""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
