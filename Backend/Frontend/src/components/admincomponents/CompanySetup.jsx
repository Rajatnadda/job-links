import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useGetCompanyById(params.id);

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-purple-50">
      <Navbar />
      <main className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10 mt-12 border border-gray-200">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 text-gray-600 font-medium hover:text-black hover:border-gray-800 transition"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Company Setup</h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="space-y-8"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-semibold">
                Company Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700 font-semibold">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief description"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="website" className="text-gray-700 font-semibold">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-gray-700 font-semibold">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="City, Country"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="file" className="text-gray-700 font-semibold">
                Company Logo
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2"
              />
              {input.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {input.file.name}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Updating...
              </span>
            ) : (
              "Update Company Info"
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default CompanySetup;
