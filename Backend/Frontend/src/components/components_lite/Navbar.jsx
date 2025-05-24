import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Logout failed", res.data);
      }
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-violet-700">Job</span>
          <span className="text-orange-500">Portal</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {user && user.role === "Recruiter" ? (
            <>
              <li className="hover:text-violet-600 transition">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="hover:text-violet-600 transition">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-violet-600 transition">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-violet-600 transition">
                <Link to="/Browse">Browse</Link>
              </li>
              <li className="hover:text-violet-600 transition">
                <Link to="/Jobs">Jobs</Link>
              </li>
            </>
          )}
        </ul>

        {/* Auth Buttons or Avatar */}
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" className="hover:border-violet-600 transition">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 transition text-white">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-violet-500 ring-offset-2">
                <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 shadow-lg border rounded-xl mt-2">
              <div className="flex items-center gap-4">
                <Avatar className="ring-2 ring-violet-500">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user?.fullname}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user?.profile?.bio || "No bio added"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {user?.role === "Student" && (
                  <div className="flex items-center gap-2">
                    <User2 className="text-violet-600" />
                    <Button variant="link" className="p-0 text-left">
                      <Link to="/Profile">Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 text-red-600">
                  <LogOut />
                  <Button variant="link" onClick={logoutHandler} className="p-0 text-left text-red-600 hover:text-red-800">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
