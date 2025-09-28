import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

function Courses() {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  console.log(isError);

  if (isError)
    return (
      <h1 className="text-center text-red-600 text-2xl">
        Some error occurred while fetching courses
      </h1>
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-4xl text-center text-gray-800 dark:text-white mb-10">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course) => (
                <Course key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 bg-gray-300 dark:bg-gray-700" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
};
