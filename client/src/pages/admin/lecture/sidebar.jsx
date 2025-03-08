import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <div className="w-[250px] sm:w-[300px] space-y-6 border-r border-gray-300 dark:border-gray-700 bg-gray-100 p-6 sticky top-0 h-full mt-16">
        <div className="space-y-6">
          {/* Dashboard Link */}
          <Link
            to="dashboard"
            className="flex items-center space-x-4 p-2 hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out"
          >
            <ChartNoAxesColumn size={22} className="text-gray-600" />
            <h1 className="text-gray-700 font-semibold text-lg">Dashboard</h1>
          </Link>

          {/* Courses Link */}
          <Link
            to="course"
            className="flex items-center space-x-4 p-2 hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out"
          >
            <SquareLibrary size={22} className="text-gray-600" />
            <h1 className="text-gray-700 font-semibold text-lg">Courses</h1>
          </Link>
        </div>
      </div>

      <div className="flex-1 p-10 overflow-auto bg-gray-50 mt-10">
        <Outlet />{" "}
      </div>
    </div>
  );
}

export default Sidebar;
