import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const Job1 = () => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 hover:p-3 duration-300 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Posted 3 days ago</p>
        <Button
          variant="outline"
          className="rounded-full group/bookmark"
          size="icon"
        >
          <Bookmark className="group-hover/bookmark:stroke-purple-600 group-hover/bookmark:fill-purple-100 transition-all duration-200" />
        </Button>
      </div>

      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 mt-1 cursor-pointer hover:opacity-80 transition-opacity duration-200">
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGGFrYgYL889yj6nxczrrpMZk4xmcvKHAi1A&s"
            alt="Company Logo"
          />
        </Avatar>
        <div className="flex-1 cursor-pointer group/textblock">
          <h3 className="text-lg font-semibold text-gray-800 group-hover/textblock:text-purple-600 transition-colors duration-200">
            Company Name
          </h3>
          <p className="text-sm text-gray-500 mb-1">India</p>

          <h2 className="text-xl font-bold text-purple-700 mb-2 group-hover/textblock:text-purple-800 group-hover/textblock:underline decoration-purple-700 underline-offset-2 transition-all duration-200">
            Job Title
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, aliquam
            autem est fugiat hic id ipsa iure laudantium libero magni, maxime,
            mollitia nemo officiis omnis optio ratione reprehenderit sapiente
            similique sunt voluptates voluptatum.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-auto">
        <Badge
          variant="outline"
          className="text-xs font-medium text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 hover:shadow-sm hover:scale-105 transform transition-all duration-150"
        >
          10 Positions
        </Badge>
        <Badge
          variant="outline"
          className="text-xs font-medium text-emerald-600 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-sm hover:scale-105 transform transition-all duration-150"
        >
          20 LPA
        </Badge>
        <Badge
          variant="outline"
          className="text-xs font-medium text-purple-600 border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 hover:shadow-sm hover:scale-105 transform transition-all duration-150"
        >
          Remote Job
        </Badge>
        <Badge
          variant="outline"
          className="text-xs font-medium text-pink-600 border-pink-300 bg-pink-50 hover:bg-pink-100 hover:border-pink-400 hover:shadow-sm hover:scale-105 transform transition-all duration-150"
        >
          Full Time
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" className=" bg-fuchsia-600 font-bold rounded-full cursor-pointer hover:bg-amber-50" >Details</Button>
        <Button variant="outline" className=" bg-blue-500 font-bold rounded-full cursor-pointer hover:bg-amber-50">Save for later.</Button>

      </div>
    </div>
  );
};
export default Job1;
