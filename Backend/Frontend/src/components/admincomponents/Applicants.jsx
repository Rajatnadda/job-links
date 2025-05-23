import React, { useEffect } from "react";
import ApplicantsTable from "../admincomponents/ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Applicants Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Total Applicants:{" "}
            <span className="font-semibold text-gray-800">
              {applicants?.applications?.length || 0}
            </span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
