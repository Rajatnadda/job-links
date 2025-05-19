import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/./data.js";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { Loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      Dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        Dispatch(setUser(res.data.user));
        Navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occured.";
      toast.error(errorMessage);
    } finally {
      Dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center  max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-b-blue-900 rounded-md p-4 my-10"
        >
          <h1 className="text-3xl font-bold text-center text-sky-500  mb-5">
            Login
          </h1>
          <div className="flex flex-col gap-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email...."
            ></Input>
            <div className="relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"} 
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password...."
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-5 my-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {Loading ? (
            <div className="flex items-center justify-center my-10 ">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button className="block w-3/4 ml-18  py-3 my-3 text-black bg-blue-600 hover:bg-blue-400/90 rounded-4xl cursor-pointer">
              Login                         
            </button>
          )}
          
          <p className="text-gray-500 text-md my-2  text-center">
            Create new account?{" "}
            <Link to="/Register" className="text-red-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
