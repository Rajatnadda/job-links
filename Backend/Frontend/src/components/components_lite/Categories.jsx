import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">Categories</h2>
        <p className="text-gray-600 text-sm mt-2">
          Explore our extensive job market
        </p>
      </div>

      <Carousel className="max-w-4xl mx-auto px-4">
        <CarouselContent>
          {Category.map((category, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 px-2 py-4"
            >
              <div
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 h-full flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  className="w-full text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  onClick={() => searchjobHandler(category)}
                >
                  {category}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </section>
  );
};

export default Categories;
