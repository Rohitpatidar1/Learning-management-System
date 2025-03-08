import React from "react";

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Unlock Your Potential with the Best Courses
        </h1>

        {/* Subtext */}
        <p className="text-gray-100 dark:text-gray-300 text-lg md:text-xl font-light mb-6">
          Transform the way you learn with our advanced Learning Management
          System.
        </p>

        {/* Search Bar with Button */}
        <form action="" className="flex justify-center items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full max-w-lg px-5 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button className="px-6 py-3 text-lg font-semibold bg-white text-purple-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300">
            Search
          </button>
        </form>
        <button className="px-6 py-3 text-lg font-semibold bg-white text-purple-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300">
          Explor Courses
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
