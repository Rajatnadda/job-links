import React from "react";
import { Badge } from "../ui/badge";

const JobCards = () => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 hover:p-3 duration-300 space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-700">Job Title</h2>
        <p className="text-sm text-gray-600 line-clamp-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, aliquam
          autem est fugiat hic id ipsa iure laudantium libero magni, maxime,
          mollitia nemo officiis omnis optio ratione reprehenderit sapiente
          similique sunt voluptates voluptatum voluptatum voluptatum voluptatum
          voluptatum voluptatum voluptatum volupt.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Badge className="text-sm font-semibold text-white bg-blue-500">
          10 Positions
        </Badge>
        <Badge className="text-sm font-semibold text-white bg-emerald-500">
          20 LPA
        </Badge>
        <Badge className="text-sm font-semibold text-white bg-purple-500">
          Remote Job
        </Badge>
        <Badge className="text-sm font-semibold text-white bg-pink-500">
          Full Time
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
