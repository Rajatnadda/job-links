import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobs from "./AppliedJobs";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";

const skills = [
  "Javascript",
  "Python",
  "React",
  "Express",
  "MonogDB",
  "NodeJs",
  "HTmL",
  "Redux",
  "MySQL",
];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className="  max-w-4xl mx-auto  border border-gay-200 rounded-3xl my-5 p-8 hover:shadow-yellow-400 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/121797925?v=4"
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h1 className="flex text-xl font-medium">{user?.fullname}</h1>
              <p className="">
                {user?.profile?.bio}
                
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right cursor-pointer"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-5 my-5">
            <Mail />
            <span className="">
            <a href={`mailto:${user?.email}`}> {user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-5 my-5">
            <Contact />
            <span className="">
              <a href={`tel:${user?.phoneNumber}`}> {user?.phoneNumber}</a>
            </span>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1 className="text-xl font-bold">Skills</h1>
            <div className="flex item-center gap-1">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>NaN</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label className="text- xl font-bold flex">Upload Resume</Label>
            <div>
              {isResume ? (
                <a
                  target="_blank"
                  href={"http//resume.com"}
                  download="Resume.pdf"
                  className=" rounded-xl text-blue-600 hover:underline font-bold cursor-pointer"
                >
                  Download
                </a>
              ) : (
                <span>No Resume Found.</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

        {/* Add Application Table */}
        <AppliedJobs />
      </div>
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
