import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Job1 from "./job1";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl gap-2 my-10 mx-auto">
        <h1 className="font-bold text-2xl text-sky-800 my-10">
          Search <span className="text-sky-800">Results: </span>{" "}
          <span className="text-fuchsia-700">{randomJobs.length}</span>
        </h1>
        <div className="grid grid-cols-3 gap-4 ">
          {randomJobs.map((item, index) => {
            return <Job1 key={index} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
