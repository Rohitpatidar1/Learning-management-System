import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CourseProgress() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.enrolledCourses) {
      setPurchasedCourses(user.enrolledCourses);
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
      {purchasedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchasedCourses.map((course) => (
            <div key={course._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>
              <Link
                to={`/course/${course._id}`}
                className="mt-2 inline-block text-blue-500 underline"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No purchased courses found.</p>
      )}
    </div>
  );
}

export default CourseProgress;
