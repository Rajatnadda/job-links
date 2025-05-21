import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";

const  Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) =>  store.auth);
 const logoutHandler = async () =>{
  try {
     const response = await axios.post(`${USER_API_ENDPOINT}/logout`,{
      withCredentials:true
     });
     if(response.data.success){
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logged out successfully.");
     
  }
  } 
  
  catch (error) {
    console.log(error); 
    toast.error(error.response.data.message)
  }
}


  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-[#6A38C2]">
            Job
            <span className="text-[#d11342]">Links</span>
          </h1>
        </div>
        <div className="flex items-center gap-11">
          <ul className="flex font-medium items-center gap-6">
            <li>
              {""}
              <Link to={"/"} className="text-[#c60deb]">
                Home
              </Link>
            </li>
            <li>
              {""}
              <Link to={"/Browse"} className="text-[#a3cb10]">
                Browse
              </Link>
            </li>
            <li>
              {""}
              <Link to={"/Jobs"} className="text-[#d68e19] ">
                Jobs{" "}
              </Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/Login">
                {" "}
                {""}
                <Button className="bg-cyan-700 hover:bg-cyan-400">Login</Button>
              </Link>
              <Link to="/Register">
                {""}
                <Button className="bg-red-500 hover:bg-amber-400 cursor-pointer">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="text-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-1">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2></User2>
                    <Button
                      variant="link"
                      className="cursor-pointer text-sky-800"
                    >
                     <Link to={"/Profile"}> Profile</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler}
                      variant="link"
                      className="cursor-pointer text-red-700"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
