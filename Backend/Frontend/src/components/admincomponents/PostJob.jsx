import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";

import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center w-full py-8 px-4">
        <form
          onSubmit={submitHandler}
          className="max-w-4xl w-full bg-white rounded-lg shadow-lg border border-gray-200 p-10 transition-shadow hover:shadow-2xl"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="font-medium text-gray-700">
                Job Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter job title"
                onChange={changeEventHandler}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description" className="font-medium text-gray-700">
                Job Description
              </Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={input.description}
                placeholder="Enter job description"
                onChange={changeEventHandler}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location" className="font-medium text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter job location"
                onChange={changeEventHandler}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="salary" className="font-medium text-gray-700">
                Salary
              </Label>
              <Input
                id="salary"
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter job salary"
                onChange={changeEventHandler}
                min={0}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="position" className="font-medium text-gray-700">
                Position (Number of Vacancies)
              </Label>
              <Input
                id="position"
                type="number"
                name="position"
                value={input.position}
                placeholder="Enter number of positions"
                onChange={changeEventHandler}
                min={0}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="requirements" className="font-medium text-gray-700">
                Requirements
              </Label>
              <Input
                id="requirements"
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter job requirements"
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="experience" className="font-medium text-gray-700">
                Experience (Years)
              </Label>
              <Input
                id="experience"
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Enter years of experience"
                onChange={changeEventHandler}
                min={0}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="jobType" className="font-medium text-gray-700">
                Job Type
              </Label>
              <Input
                id="jobType"
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Full-time, Part-time, etc."
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="font-medium text-gray-700 mb-1">
                Select Company
              </Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md shadow-sm hover:border-indigo-500 focus:ring-indigo-500 focus:ring-2">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-600 font-semibold mt-2">
                  *Please register a company to post jobs.*
                </p>
              )}
            </div>
          </div>

          <div className="mt-10">
            {loading ? (
              <Button
                disabled
                className="w-full flex justify-center items-center gap-2 py-3 bg-gray-700 text-white rounded-md cursor-not-allowed"
              >
                <Loader2 className="animate-spin" size={20} />
                Posting...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
              >
                Post Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
