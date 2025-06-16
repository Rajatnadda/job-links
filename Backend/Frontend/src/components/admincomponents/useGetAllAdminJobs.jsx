import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get("/api/job/admin-jobs");
        console.log("API Response:", res.data); // ✅ You have this
        if (res.data?.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching admin jobs", error);
      }
    };

    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
