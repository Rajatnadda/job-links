import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skills) => skills),
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occured");
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white border-2 border-black sm:max-w-[500px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFileChange}>
          <div className="bg-white grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <input
                type="text"
                id="name"
                value={input.fullname}
                name="name"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <input
                type="email"
                id="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                PhoneNumber
              </Label>
              <input
                type="tel"
                id="phone"
                value={input.phoneNumber}
                name="phone"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <input
                type="bio"
                id="bio"
                value={input.bio}
                name="bio"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <input
                type="text"
                id="skills"
                value={input.skills}
                name="skills"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume File Upload
              </Label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <div className="flex items-center justify-center my-10 ">
                <div className="spinner-border text-blue-600" role="status">
                  <Button className="ww-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please
                    Wait..
                  </Button>
                </div>
              </div>
            ) : (
              <button className="block w-full ml-18  py-3 my-3 text-white bg-black hover:bg-black/70 rounded-4xl cursor-pointer">
                Save
              </button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
