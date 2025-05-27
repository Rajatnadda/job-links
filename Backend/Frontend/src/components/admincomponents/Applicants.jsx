import React, { useEffect } from "react";
import ApplicantsTable from "../admincomponents/ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error.message);
      }
    };
    fetchAllApplicants();
  }, [id, dispatch]);

  const applicantCount = applicants?.applications?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Applicants Overview</h1>
          <p className="text-gray-600 mt-2">
            Total Applicants:{" "}
            <span className="font-semibold text-gray-800">{applicantCount}</span>
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {applicantCount === 0 ? (
            <p className="text-center text-gray-500 italic">No applicants found.</p>
          ) : (
            <ApplicantsTable />
          )}
        </section>
      </main>
    </div>
  );
};

export default Applicants;
