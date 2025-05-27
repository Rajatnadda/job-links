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
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
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
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <div className="flex items-center justify-center px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 my-10 border border-gray-200"
        >
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
            Create Your Account
          </h1>

          {/* Input Fields */}
          {[
            { label: "Fullname", name: "fullname", type: "text", placeholder: "John Doe" },
            { label: "Email", name: "email", type: "email", placeholder: "johndoe@gmail.com" },
            { label: "Password", name: "password", type: "password", placeholder: "********" },
            { label: "PAN Card Number", name: "pancard", type: "text", placeholder: "ABCDEF1234G" },
            { label: "Adhar Card Number", name: "adharcard", type: "text", placeholder: "123456789012" },
            { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "+1234567890" },
          ].map((field) => (
            <div className="my-3" key={field.name}>
              <Label className="text-gray-700">{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                value={input[field.name]}
                onChange={changeEventHandler}
                placeholder={field.placeholder}
                className="mt-1 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Role Radio Buttons */}
          <div className="my-5">
            <Label className="text-gray-700 block mb-2">Register As</Label>
            <div className="flex gap-6">
              {["Student", "Recruiter"].map((role) => (
                <label key={role} className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                  />
                  <span className="text-gray-800">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="my-4">
            <Label className="text-gray-700">Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={ChangeFilehandler}
              className="mt-1 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
          </div>

          {/* Submit / Loading */}
          {loading ? (
            <div className="flex justify-center my-6">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 mt-6 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200"
            >
              Register
            </button>
          )}

          {/* Already have account */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
