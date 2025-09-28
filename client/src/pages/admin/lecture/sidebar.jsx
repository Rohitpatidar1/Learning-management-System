import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sm:hidden absolute top-6 left-6 z-10 bg-blue-600 text-white p-3 rounded-md"
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar Component */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } sm:block w-[250px] sm:w-[300px] space-y-6 border-r border-gray-300 bg-white p-6 sticky top-0 h-full mt-16 shadow-md transition-all duration-300`}
      >
        <div className="space-y-6">
          {/* Dashboard Link */}
          <Link
            to="dashboard"
            className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 font-semibold text-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
          >
            <ChartNoAxesColumn size={22} className="text-blue-600" />
            <span>Dashboard</span>
          </Link>

          {/* Courses Link */}
          <Link
            to="course"
            className="flex items-center space-x-4 p-3 rounded-lg text-gray-700 font-semibold text-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
          >
            <SquareLibrary size={22} className="text-blue-600" />
            <span>Courses</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-auto bg-gray-50 mt-16">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
