import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import Navbar from "../components_lite/Navbar";
import { JOB_API_ENDPOINT } from "@/utils/data";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    company: "",
  });

  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedCompany) {
      setInput({ ...input, company: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.company) {
      toast.error("Please select a company.");
      return;
    }

    const preparedInput = {
      title: input.title,
      description: input.description,
      requirements: input.requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      salary: input.salary,
      location: input.location,
      jobType: input.jobType,
      experience: Number(input.experience),
      position: Number(input.position),
      company: input.company,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, preparedInput, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs/create");
      } else {
        toast.error(res.data.message || "Job post failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Navbar />
      <div className="flex justify-center py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="max-w-4xl w-full bg-white border border-gray-200 shadow-xl rounded-2xl p-10 space-y-8"
        >
          <h2 className="text-3xl font-bold text-indigo-700 text-center">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Job Title"
              id="title"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              placeholder="Enter job title"
              required
            />
            <InputField
              label="Description"
              id="description"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter job description"
              required
            />
            <InputField
              label="Requirements (comma separated)"
              id="requirements"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              placeholder="e.g. React, Node.js, MongoDB"
              required
            />
            <InputField
              label="Salary"
              id="salary"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              placeholder="Enter salary"
              required
            />
            <InputField
              label="Location"
              id="location"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter location"
              required
            />
            <InputField
              label="Job Type"
              id="jobType"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              placeholder="e.g. Full-time"
              required
            />
            <InputField
              label="Experience (in years)"
              id="experience"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              placeholder="e.g. 2"
              required
              type="number"
            />
            <InputField
              label="Number of Positions"
              id="position"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              placeholder="e.g. 3"
              required
              type="number"
            />

            <div className="md:col-span-2">
              <Label>Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1 border border-gray-300 rounded-md shadow-sm">
                    <SelectValue placeholder="Choose a company" />
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
                <p className="text-sm text-red-600 mt-2">
                  *No companies available. Please register one first.*
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-md transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1"
    />
  </div>
);

export default PostJob;
