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
      // Trigger fade-in animation by adding Tailwind's opacity and translate utilities
      cardRef.current.classList.remove("opacity-0", "translate-y-2");
      cardRef.current.classList.add("opacity-100", "translate-y-0", "transition-opacity", "duration-600", "ease-in-out");
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white pb-12">
        <Navbar />

        <div
          ref={cardRef}
          className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-200 rounded-3xl
                     shadow-lg hover:shadow-indigo-400 transition-shadow duration-300 ease-in-out
                     scale-100 hover:scale-[1.03] opacity-0 translate-y-2"
        >
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-8">
              <Avatar className="h-28 w-28 shadow-lg ring-4 ring-indigo-600 transition-transform duration-300 ease-in-out rounded-full hover:scale-110">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User Avatar"}
                  className="rounded-full"
                />
              </Avatar>
              <div>
                <h1 className="text-3xl font-extrabold tracking-wider text-indigo-900">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600 italic max-w-xl mt-1">{user?.profile?.bio || "No bio available"}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mt-3 flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300 font-semibold"
            >
              <Pen className="w-5 h-5" />
              Edit
            </Button>
          </div>

          {/* Contact Section */}
          <div className="mt-10 space-y-4 text-gray-700">
            <div className="flex items-center gap-4 cursor-pointer hover:text-indigo-700 transition-colors">
              <Mail className="w-6 h-6" />
              <a
                href={`mailto:${user?.email}`}
                className="underline decoration-indigo-400 hover:decoration-indigo-600"
              >
                {user?.email || "Not provided"}
              </a>
            </div>
            <div className="flex items-center gap-4 cursor-pointer hover:text-indigo-700 transition-colors">
              <Contact className="w-6 h-6" />
              <a
                href={`tel:${user?.phoneNumber}`}
                className="underline decoration-indigo-400 hover:decoration-indigo-600"
              >
                {user?.phoneNumber || "Not provided"}
              </a>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold shadow-sm
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
            <label className="block text-xl font-semibold text-indigo-700 mb-3 border-b-2 border-indigo-200 pb-1">
              Resume
            </label>
            {isResume && user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-indigo-700 font-semibold underline hover:text-indigo-900 transition-colors"
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
          className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-indigo-200 rounded-3xl
                     shadow-md hover:shadow-indigo-400 transition-shadow duration-300"
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
