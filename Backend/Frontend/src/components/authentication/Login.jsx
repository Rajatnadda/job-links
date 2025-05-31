import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import LoginNavbar from "../components_lite/LoginNavbar";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-blue-400 via-purple-300 to-pink-400 opacity-60 blur-2xl scale-125" />

      {/* Foreground */}
      <div className="relative z-10">
        <LoginNavbar />

        <div className="flex items-center justify-center px-4 sm:px-0">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 mt-12 mb-16 border border-white border-opacity-30 transition duration-300 ease-in-out"
          >
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
              Welcome Back 👋
            </h1>

            <div className="mb-4">
              <Label className="text-sm text-gray-700">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="johndoe@example.com"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div className="mb-4">
              <Label className="text-sm text-gray-700">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div className="mb-6">
              <Label className="block text-sm text-gray-700 mb-2">Role</Label>
              <div className="flex items-center space-x-6">
                {["Student", "Recruiter"].map((role) => (
                  <label key={role} className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                    <Input
                      type="radio"
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                      className="accent-blue-600"
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center my-6">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 transition duration-200 text-white font-semibold rounded-lg shadow-md"
              >
                Login
              </button>
            )}

            <p className="text-center text-sm text-gray-700 mt-6">
              Don&apos;t have an account?{" "}
              <Link to="/register">
                <span className="text-green-600 hover:underline font-medium">
                  Register here
                </span>
              </Link>
            </p>
          </form>
        </div>

        
      </div>
      
    </div>
  );
};

export default Login;
