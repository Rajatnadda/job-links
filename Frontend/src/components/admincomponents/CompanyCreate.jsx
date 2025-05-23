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
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

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
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-8 mt-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Add New Company
          </h1>
          <p className="text-gray-600 text-sm">
            Please enter the company name to get started.
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
            <Label htmlFor="companyName" className="font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6 py-2">
              Continue
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CompanyCreate;
