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
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) {
        formData.append(key, input[key]);
      }
    });

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
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-5 border border-gray-200"
        >
          <h1 className="text-2xl font-bold text-center text-blue-700">
            Create Your Account
          </h1>

          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="johndoe@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <div>
            <Label>PAN Card</Label>
            <Input
              type="text"
              name="pancard"
              value={input.pancard}
              onChange={changeEventHandler}
              placeholder="ABCDE1234F"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Aadhar Card</Label>
            <Input
              type="text"
              name="adharcard"
              value={input.adharcard}
              onChange={changeEventHandler}
              placeholder="123456789012"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+91 9876543210"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="block mb-2">Role</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="accent-blue-600"
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="accent-blue-600"
                />
                Recruiter
              </label>
            </div>
          </div>

          <div>
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={ChangeFilehandler}
              className="file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer mt-1"
            />
          </div>

          {loading ? (
            <div className="flex justify-center my-6">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Register
            </button>
          )}

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
