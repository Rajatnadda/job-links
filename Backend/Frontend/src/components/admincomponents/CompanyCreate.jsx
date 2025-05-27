import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/CompanySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company?._id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <Navbar />
      <main className="max-w-xl mx-auto bg-white shadow-xl rounded-lg p-8 mt-16 border border-gray-200">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Add New Company</h1>
          <p className="text-gray-600 text-sm mt-1">
            Enter the company name to proceed with registration.
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerNewCompany();
          }}
          className="space-y-6"
        >
          <div>
            <Label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g., Google LLC"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="px-6 py-2 border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CompanyCreate;
