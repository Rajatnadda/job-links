import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Kolkata",
      "Mumbai",
      "Bangalore",
      "Pune",
      "Hyderabad",
      "Kolhapur",
      "Remote",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Manufacturing",
      "Finance",
      "Marketing",
      "Education",
      "Healthcare",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 Years", "3-5 Years", "5-10 Years", "10-15 Years", "15+ Years"],
  },
  {
    filterType: "Salary",
    array: [
      "0-50k",
      "50k-100k",
      "100k-150k",
      "150k-200k",
      "200k-250k",
      "250k+",
    ],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="text-lg font-bold text-gray-900
      ">Filter <span className="text-fuchsia-700">Jobs </span></h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="text-lg font-bold text-amber-700">{data.filterType}</h2>
            {data.array.map((item, index) => (
              <div key={index} className="gap-4 flex items-center space-x-2 my-2">
                <RadioGroupItem value={item}></RadioGroupItem>
                <label>{item}</label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
