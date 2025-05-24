import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJobs";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto my-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-yellow-400 transition-shadow">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname || "User Avatar"}
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="mt-2">
            <Pen className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Contact Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5" />
            <a href={`mailto:${user?.email}`} className="hover:underline">{user?.email}</a>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="w-5 h-5" />
            <a href={`tel:${user?.phoneNumber}`} className="hover:underline">{user?.phoneNumber}</a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-800 mb-1">Resume</label>
          {isResume && user?.profile?.resume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Download {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">No Resume Found</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold mb-4">Applied Jobs</h2>
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
