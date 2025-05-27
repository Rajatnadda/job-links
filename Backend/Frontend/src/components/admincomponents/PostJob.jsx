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
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
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
        toast.error(res.data.message || "Failed to post job");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
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
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Software Engineer"
                value={input.title}
                onChange={changeEventHandler}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Job summary or responsibilities"
                value={input.description}
                onChange={changeEventHandler}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. New York, Remote"
                value={input.location}
                onChange={changeEventHandler}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                min={0}
                placeholder="e.g. 70000"
                value={input.salary}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="position">Number of Positions</Label>
              <Input
                id="position"
                name="position"
                type="number"
                min={1}
                placeholder="e.g. 3"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Input
                id="requirements"
                name="requirements"
                placeholder="e.g. React, Node.js"
                value={input.requirements}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                min={0}
                placeholder="e.g. 2"
                value={input.experience}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Input
                id="jobType"
                name="jobType"
                placeholder="Full-time, Part-time"
                value={input.jobType}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

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

export default PostJob;
