import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/CompanySlice";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Companies Management
          </h1>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
          >
            Add Company
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6 max-w-md">
          <Input
            type="search"
            placeholder="Filter by Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            aria-label="Filter companies by name"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <CompaniesTable />
        </div>
      </main>
    </div>
  );
};

export default Companies;
