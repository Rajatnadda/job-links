import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job
            <span className="text-[#d11342]">Links</span>
          </h1>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-6">
            <li className="text-[#c60deb]">Home</li>
            <li className="text-[#a3cb10]">Browse</li>
            <li className="text-[#d68e19] ">Jobs  </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
