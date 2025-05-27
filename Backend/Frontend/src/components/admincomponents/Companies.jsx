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
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Companies Management</h1>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
          >
            + Add Company
          </Button>
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-md">
          <Input
            type="search"
            placeholder="Search companies by name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm p-3"
            aria-label="Filter companies by name"
          />
        </div>

        {/* Companies Table Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <CompaniesTable />
        </div>
      </main>
    </div>
  );
};

export default Companies;
