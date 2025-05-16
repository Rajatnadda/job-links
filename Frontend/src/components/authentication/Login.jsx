import React from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
const Login = () => {



  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center  max-w-7xl mx-auto ">
        <form
          action=""
          className="w-1/2 border border-b-blue-900 rounded-md p-4 my-10"
        >
          <h1 className="text-3xl font-bold text-center text-sky-500  mb-5">
            Login
          </h1>
          <div className="flex flex-col gap-4">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email...."></Input>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password...."
            ></Input>
          </div>
          {/* //Radio button for checking student or recuriter */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-5 my-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <button className="block w-3/4 ml-18  py-3 my-3 text-black bg-blue-600 hover:bg-blue-400/90 rounded-4xl cursor-pointer">
            Login
          </button>
          {/* don't have an account */}
          <p className="text-gray-500 text-md my-2  text-center">
            Create new account?{" "}
            <Link to="/register" className="text-red-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
