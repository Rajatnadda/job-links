import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Description = () => {
  const isApplied = false;
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Title</h1>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-auto">
              <Badge
                variant="outline"
                className="text-xs font-medium text-blue-600 border-blue-300 "
              >
                10 Positions
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-medium text-blue-600 border-blue-300 "
              >
                20 LPA
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-medium text-blue-600 border-blue-300 "
              >
                Remote Job
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-medium text-blue-600 border-blue-300"
              >
                Full Time
              </Badge>
            </div>
          </div>
          <div>
            <Button
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#6B3AC2] hover:bg-amber-600"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          </div>{" "}
        </div>
        <h1 className="border-b-2 border-b-gray-200 font-medium py-4">
        Job Desscription:-
      </h1>
      <div className="my-4 ">
        <h1 className="font-bold my-1">
            Role: <span className="pl-4 font-normal text-gray-500">Software Engineer.</span>
        </h1>
        <h1 className="font-bold my-1">
            Location: <span className="pl-4 font-normal text-gray-500">Remote Job.</span>
        </h1>
        <h1 className="font-bold my-1">
            Salary: <span className="pl-4 font-normal text-gray-500">50k-150k.</span>
        </h1>
        <h1 className="font-bold my-1">
            JobType: <span className="pl-4 font-normal text-gray-500">Full Time.</span>
        </h1>
        <h1 className="font-bold my-1">
            Position: <span className="pl-4 font-normal text-gray-500">Senior Developer.</span>
        </h1>
        <h1 className="font-bold my-1">
            Total Applicant: <span className="pl-4 font-normal text-gray-500">10.</span>
        </h1>
      </div>
      </div>
      
    </div>
  );
};

export default Description;
