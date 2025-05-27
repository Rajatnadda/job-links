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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const result = companies.filter((company) =>
      searchCompanyByText
        ? company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilteredCompanies(result);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
      <Table className="min-w-full text-sm text-gray-700">
        <TableCaption className="py-4 text-gray-500 italic">
          Your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-5 py-3">Logo</TableHead>
            <TableHead className="px-5 py-3">Company Name</TableHead>
            <TableHead className="px-5 py-3">Date</TableHead>
            <TableHead className="px-5 py-3 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company) => (
              <TableRow
                key={company._id}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell className="px-5 py-3">
                  <Avatar className="h-10 w-10 border border-gray-200 shadow-sm">
                    <AvatarImage
                      src={company.logo || "/default-logo.png"}
                      alt={`${company.name} logo`}
                      className="object-contain"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="px-5 py-3 font-semibold">
                  {company.name}
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-600">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="px-5 py-3 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="More options"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 border border-gray-200 rounded-md shadow-md bg-white">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-indigo-50 text-indigo-700 font-medium transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
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

export default CompaniesTable;
