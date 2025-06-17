import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get("/api/job/admin-jobs", {
          withCredentials: true, // ✅ add if your backend uses cookies
        });

        if (isMounted && res.data?.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.warn("Failed to fetch jobs or no jobs returned");
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error.message);
      }
    };

    fetchAdminJobs();

    return () => {
      isMounted = false; // cleanup
    };
  }, [dispatch]);
};

export default useGetAllAdminJobs;
