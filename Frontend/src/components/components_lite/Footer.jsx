import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for navigation

const Footer = () => {
  return (
    <div className="bg-gray-100 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-xl font-bold text-[#6A38C2]">
              Job<span className="text-[#d11342]">Links</span>
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              &copy; {new Date().getFullYear()} JobLinks. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-[#6A38C2]">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#6A38C2]">Contact</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-[#6A38C2]">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-[#6A38C2]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
