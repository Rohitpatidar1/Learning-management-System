import React from "react";

function Dashboard() {
  return (
    <div className="p-6">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700">Total Courses</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">25</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700">
            Students Enrolled
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">1200</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-700">
            Active Instructors
          </h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">15</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">New Course Added: React Basics</div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Student Enrollment: Alice Johnson
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Instructor Updated: Michael Lee</div>
            <span className="text-sm text-gray-500">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
