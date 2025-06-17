import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/CompanySlice";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import Footer from "../components_lite/Footer";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetAllCompanies();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-1/2"
            placeholder="Search companies by name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/companies/create")}
          >
            + Add Company
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <CompaniesTable />
        </div>
      </div>
      <div>

      <Footer/>
      </div>
    </div>
  );
};

export default Companies;
