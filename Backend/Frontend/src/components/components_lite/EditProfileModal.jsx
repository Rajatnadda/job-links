import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";

const EditProfileModal = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(input).forEach(([key, value]) => {
      if (key === "file" && !value) return;
      formData.append(key, value);
    });

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white border sm:max-w-[600px] rounded-2xl shadow-xl px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 py-4">
            <InputField label="Full Name" id="fullname" value={input.fullname} onChange={changeHandler} />
            <InputField label="Email" id="email" type="email" value={input.email} onChange={changeHandler} />
            <InputField label="Phone Number" id="phoneNumber" type="tel" value={input.phoneNumber} onChange={changeHandler} />
            <InputField label="Bio" id="bio" value={input.bio} onChange={changeHandler} />
            <InputField label="Skills (comma separated)" id="skills" value={input.skills} onChange={changeHandler} />

            <div>
              <Label htmlFor="file" className="block mb-1 text-sm font-medium text-gray-700">
                Resume (PDF)
              </Label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md transition"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const InputField = ({ label, id, type = "text", value, onChange }) => (
  <div>
    <Label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </Label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
    />
  </div>
);

export default EditProfileModal;
