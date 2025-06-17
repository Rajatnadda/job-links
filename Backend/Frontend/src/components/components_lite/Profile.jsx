import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJobs";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.remove("opacity-0", "translate-y-4");
      cardRef.current.classList.add(
        "opacity-100",
        "translate-y-0",
        "transition-all",
        "duration-700",
        "ease-in-out"
      );
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-indigo-600 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-50">
      <Navbar />

      {/* Profile Card */}
      <div
        ref={cardRef}
        className="max-w-5xl mx-auto my-10 p-10 bg-white shadow-2xl border border-gray-300 rounded-3xl opacity-0 translate-y-4"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-indigo-500 shadow-lg">
              <AvatarImage
                src={user?.profile?.profilePhoto || "/default-avatar.png"}
                alt={user?.fullname || "User Avatar"}
              />
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-500 mt-1 italic text-sm md:text-base">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
          >
            <Pen size={16} />
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-indigo-500" size={20} />
            <a
              href={`mailto:${user?.email}`}
              className="hover:underline hover:text-indigo-700"
            >
              {user?.email || "Not provided"}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-indigo-500" size={20} />
            <a
              href={`tel:${user?.phoneNumber}`}
              className="hover:underline hover:text-indigo-700"
            >
              {user?.phoneNumber || "Not provided"}
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-indigo-700 border-b border-indigo-200 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold shadow"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-400 italic">No skills added</p>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-indigo-700 border-b border-indigo-200 pb-2">
            Resume
          </h2>
          <div className="mt-4">
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium underline hover:text-indigo-800"
              >
                Download {user?.profile?.resumeOriginalName || "Resume"}
              </a>
            ) : (
              <p className="text-gray-400 italic">No resume uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div
        id="applied-jobs-section"
        className="max-w-5xl mx-auto mb-16 mt-6 p-8 bg-white border border-gray-200 rounded-3xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Applied Jobs</h2>
        <AppliedJob />
      </div>

      {/* Edit Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
