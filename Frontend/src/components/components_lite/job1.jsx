import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const Job1 = () => {
  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer
     hover:shadow-2xl hover:shadow-blue-200 hover:p-2"
    >
      <div className="flex items-center justify-between">
        <p className="cursor-none">3 days ago.</p>
        <Button
          variant="outline"
          className="rounded-full cursor-pointer hover:shadow-xl hover:shadow-blue-900 hover:p-5"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon"   className="p-2 border-none">
          <Avatar>
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-evZrCk2oKnwP283ItCy0SWWBKzYzKvKLQ&s"
              className="cursor-pointer hover:shadow-xl hover:shadow-blue-900 hover:p-1"
            ></AvatarImage>
          </Avatar>
        </Button>
          <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 hover:p-3 duration-300 space-y-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Company Name
              </h1>
              <p className="text-sm text-gray-500">India</p>
            </div>
        <div>

            <div>
              <h2 className="text-lg font-bold text-gray-700">Job Title</h2>
              <p className="text-sm text-gray-600 line-clamp-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                aliquam autem est fugiat hic id ipsa iure laudantium libero
                magni, maxime, mollitia nemo officiis omnis optio ratione
                reprehenderit sapiente similique sunt voluptates voluptatum
                voluptatum voluptatum voluptatum voluptatum voluptatum
                voluptatum volupt.
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
        </div>
      </div>
    </div>
  );
};

export default Job1;
