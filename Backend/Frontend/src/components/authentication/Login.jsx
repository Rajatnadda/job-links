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
import Footer from "../components_lite/Footer";

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
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans">
      {/* Navbar */}
      <LoginNavbar />

      {/* Main Content */}
      <div className="flex-grow flex items-start justify-center px-4 py-8 pt-24 sm:pt-28">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3">
              <span className="text-lg text-white">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Login to continue your journey</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
            <form onSubmit={submitHandler} className="space-y-5">
              {/* Email */}
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium text-sm flex items-center gap-1">
                  📧 Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="johndoe@example.com"
                  className="h-10 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/70 text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium text-sm flex items-center gap-1">
                  🔒 Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="h-10 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/70 text-sm"
                  required
                />
              </div>

              {/* Role */}
              <div className="space-y-1">
                <Label className="text-gray-700 font-medium text-sm flex items-center gap-1">
                  👥 Role
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Student", "Recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105
                      ${input.role === role
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white/70 hover:border-gray-300"
                      }`}
                    >
                      <Input
                        type="radio"
                        name="role"
                        value={role}
                        checked={input.role === role}
                        onChange={changeEventHandler}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                          input.role === role ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}>
                          {input.role === role && (
                            <div className="w-full h-full rounded-full bg-blue-500 scale-50"></div>
                          )}
                        </div>
                        {role === "Student" ? "🎓 Student" : "🏢 Recruiter"}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                {loading ? (
                  <div className="flex justify-center items-center h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white font-medium text-sm">Logging in...</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    <span>🚀</span>
                    Login
                  </button>
                )}
              </div>

              {/* Register Redirect */}
              <div className="text-center pt-3 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-green-600 font-semibold hover:text-purple-600 transition-colors duration-200 hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs">
              Your credentials are encrypted and securely stored.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
