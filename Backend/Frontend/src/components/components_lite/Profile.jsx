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

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Trigger fade-in animation by adding class after mount
      cardRef.current.style.animation = "fadeIn 0.5s ease forwards";
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(5px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white pb-12">
        <Navbar />

        <div
          ref={cardRef}
          className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-200 rounded-3xl shadow-lg
                      hover:shadow-yellow-400 transition-shadow duration-500 ease-in-out
                      scale-100 hover:scale-[1.02]"
          style={{ opacity: 0 }}
        >
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-8">
              <Avatar className="h-28 w-28 shadow-lg ring-4 ring-indigo-300 transition-transform duration-300 ease-in-out hover:scale-110">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User Avatar"}
                />
              </Avatar>
              <div>
                <h1 className="text-3xl font-extrabold text-indigo-900 tracking-wide">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600 mt-1 italic max-w-xl">{user?.profile?.bio || "No bio available"}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mt-3 flex items-center gap-2 text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white transition-colors duration-300"
            >
              <Pen className="w-5 h-5" />
              Edit
            </Button>
          </div>

          {/* Contact Section */}
          <div className="mt-10 space-y-4 text-gray-700">
            <div className="flex items-center gap-4 hover:text-indigo-600 transition-colors cursor-pointer">
              <Mail className="w-6 h-6" />
              <a href={`mailto:${user?.email}`} className="underline decoration-indigo-400 hover:decoration-indigo-600" >
                {user?.email || "Not provided"}
              </a>
            </div>
            <div className="flex items-center gap-4 hover:text-indigo-600 transition-colors cursor-pointer">
              <Contact className="w-6 h-6" />
              <a href={`tel:${user?.phoneNumber}`} className="underline decoration-indigo-400 hover:decoration-indigo-600" >
                {user?.phoneNumber || "Not provided"}
              </a>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-indigo-800 mb-3 border-b border-indigo-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full font-medium shadow-sm
                               hover:bg-indigo-200 transition-colors duration-300 cursor-default select-none"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 italic">No skills added</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-10">
            <label className="block text-xl font-semibold text-indigo-800 mb-3 border-b border-indigo-200 pb-1">
              Resume
            </label>
            {isResume && user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 underline transition-colors"
              >
                Download {user?.profile?.resumeOriginalName || "Resume"}
              </a>
            ) : (
              <span className="text-gray-400 italic">No Resume Found</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div
          className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-3xl
                     shadow-md hover:shadow-indigo-300 transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Applied Jobs</h2>
          <AppliedJob />
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Profile;
