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
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Manage Companies</h2>
          <Button onClick={() => navigate("/admin/companies/create")}>+ Add Company</Button>
        </div>
        <Input
          type="search"
          placeholder="Search companies..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full mb-4"
        />
        <div className="bg-white rounded-lg shadow p-4">
          <CompaniesTable />
        </div>
      </main>
    </div>
  );
};

export default Companies;
