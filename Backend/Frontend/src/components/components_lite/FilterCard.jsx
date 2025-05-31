import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi", "Mumbai", "Kolhapur", "Pune",
      "Bangalore", "Hyderabad", "Chennai", "Remote"
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern", "React", "Data Scientist", "Fullstack",
      "Node", "Python", "Java", "frontend", "backend", "mobile", "desktop"
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-800 border-b border-gray-300 pb-2">
        Filter Jobs
      </h1>

      <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-lg font-semibold text-indigo-700">{data.filterType}</h2>
            <div className="flex flex-wrap gap-4">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 cursor-pointer select-none"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={itemId}
                      className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
