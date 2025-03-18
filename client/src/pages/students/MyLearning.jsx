import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadUserQuery } from "@/features/api/authApi";

function MyLearning() {
  const { data, isLoading } = useLoadUserQuery();
  const MyLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : MyLearning.length === 0 ? (
          <p>You are not enrolled in any course</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MyLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLearning;

export const MyLearningSkeleton = () => {
  return (
    // ✅ Added return statement
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );
};
