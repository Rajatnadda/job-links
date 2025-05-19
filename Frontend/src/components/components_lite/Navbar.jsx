import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const  Navbar = () => {

  const { user } = useSelector((store) =>  store.auth);



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
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="text-medium">Rajat Nadda</h3>
                    <p className="text-sm text-muted-foreground">
                      lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                      Profile
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button
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
