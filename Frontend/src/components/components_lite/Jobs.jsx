import React from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job1 from "./job1.jsx";
import Footer from "./Footer";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,];

const Jobs = () => {
  const {alljobs} = useSelector((store) => store.job)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {alljobs.length <= 0 ? (
            <span className="">JobNot Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {alljobs.map((job) => (
                  <div key={job.id}>
                    <Job1 job={job} />

                  </div>
                ))}
              </div>
            </div> 
          )}
        </div> 
        <div>
        <Footer /></div>
      </div>
      
    </div>
  );
};

export default Jobs;
