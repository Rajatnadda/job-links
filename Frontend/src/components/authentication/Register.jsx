import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";

const Register = () => {
    const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNuber: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });  
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center  max-w-7xl mx-auto ">
        <form
          action=""
          className="w-1/2 border border-b-blue-900 rounded-md p-4 my-10"
        >
          <h1 className="text-3xl font-bold text-center text-amber-500  mb-5">
            Register
          </h1>
          <div className="flex flex-col gap-4">
            <Label>Name</Label>
            <Input type="text" placeholder="Enter your name...."></Input>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email...."></Input>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password...."
            ></Input>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm your password...."
            ></Input>
            <Label>Phone Number</Label>
            <Input
              type="tel  "
              placeholder="Enter your phone number...."
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
          <div className="flex items-center gap-2">
            <Label>Profile Photo</Label>
            <Input type="file" accept="image/*" className="cursor-pointer" />
          </div>
          <button className="block w-full py-3 my-3 text-black bg-cyan-700 hover:bg-amber-400 rounded-4xl cursor-pointer">
            Register
          </button>
          {/* already have an account then login0 */}
          <p className="text-gray-500 text-md my-2 items-center text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
