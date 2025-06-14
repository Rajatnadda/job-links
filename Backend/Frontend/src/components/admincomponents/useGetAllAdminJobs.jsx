import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/api/job/admin");
        if (data.success) {
          dispatch(setAllAdminJobs(data.jobs));
        }
      } catch (error) {
        console.error("Error fetching admin jobs", error);
      }
    };

    fetchJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
