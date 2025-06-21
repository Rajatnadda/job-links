// src/hooks/useGetAllJobs.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice"; // make sure this exists
import { JOB_API_ENDPOINT } from "@/utils/data"; // update if your endpoint is different

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/all`, {
          withCredentials: true,
        });

        if (res.data?.success && Array.isArray(res.data.jobs)) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.warn("No jobs returned or malformed data:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error.message || error);
      }
    };

    fetchJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
