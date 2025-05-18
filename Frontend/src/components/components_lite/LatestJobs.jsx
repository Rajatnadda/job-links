import React from "react";
import JobCards from "./JobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-3xl font-bold">
        <span className="text-[#d11342] ">Latest & Top</span>
        <span className="text-[#6A38C2]"> Job Openings!</span>
      </h2>
    
    <div className="grid grid-cols-3 gap-4 my-5">
 {randomJobs.slice(0, 6  ).map((job, index) => (
      <JobCards key={index}></JobCards>
    
   ))}
    </div>
  


   </div>
   )
     }


export default LatestJobs;
