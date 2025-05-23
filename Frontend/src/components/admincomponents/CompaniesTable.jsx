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
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm py-4">
          Your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-3 text-left text-gray-700 font-semibold text-sm border-b border-gray-300">
              Logo
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-gray-700 font-semibold text-sm border-b border-gray-300">
              Company Name
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-gray-700 font-semibold text-sm border-b border-gray-300">
              Date
            </TableHead>
            <TableHead className="px-4 py-3 text-right text-gray-700 font-semibold text-sm border-b border-gray-300">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-gray-500 italic"
              >
                No companies added
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="px-4 py-3 border-b border-gray-200">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={company.logo || "/default-logo.png"}
                      alt={`${company.name} logo`}
                      className="object-contain"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200 text-gray-800 font-medium">
                  {company.name}
                </TableCell>
                <TableCell className="px-4 py-3 border-b border-gray-200 text-gray-600">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
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
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-indigo-50 transition-colors"
                      >
                        <Edit2 className="w-4 text-indigo-600" />
                        <span className="text-indigo-700 font-medium">Edit</span>
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
