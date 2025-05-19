import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { fullname, email, password, role, phoneNumber } = input;

    if (!fullname || !email || !password || !role || !phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phoneNumber", phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white p-8 shadow-xl rounded-2xl border"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Create Your Account
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="block mb-1">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="e.g., John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="block mb-1">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="e.g., user@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="block mb-1">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Minimum 6 characters"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label className="block mb-1">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="e.g., +919876543210"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <Label className="block mb-2">Select Role</Label>
            <RadioGroup className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Input
                  id="roleStudent"
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  required
                />
                <Label htmlFor="roleStudent">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="roleRecruiter"
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="roleRecruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Photo */}
          <div className="mb-4">
            <Label className="block mb-1">Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={ChangeFilehandler}
              className="cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
