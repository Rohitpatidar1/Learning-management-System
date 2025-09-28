import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return (
      <h1 className="text-center text-2xl font-semibold text-gray-500">
        Loading...
      </h1>
    );
  if (isError)
    return (
      <h1 className="text-center text-red-500 text-2xl font-semibold">
        Failed to load course details. Please try again.
      </h1>
    );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Banner Section with Red and Blue Gradient */}
      <div className="bg-gradient-to-r from-red-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-bold text-4xl md:text-5xl mb-4 mt-12 text-white">
            {course?.courseTitle}
          </h1>
          <p className="text-xl text-gray-300">
            {course?.subTitle || "No subtitle available"}
          </p>
          <p className="mt-3 text-base">
            Created by{" "}
            <span className="text-blue-400 underline italic text-lg">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
            <BadgeInfo size={16} />
            <p className="text-lg">
              Last updated {course?.createdAt?.split("T")[0]}
            </p>
          </div>
          <p className="mt-3 text-lg">
            Students enrolled:{" "}
            <span className="font-semibold text-white">
              {course?.enrolledStudents?.length}
            </span>
          </p>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
        {/* Left Column: Course Description */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="w-full space-y-8">
            <h1 className="font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Description
            </h1>
            <p
              className="text-xl text-gray-800 dark:text-gray-300 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: course?.description }}
            />
          </div>
          <Card className="shadow-lg rounded-lg bg-gradient-to-r from-red-500 to-white">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-white">
                Course Content
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                {course?.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 bg-white rounded-lg p-4 shadow-md">
              {course?.lectures?.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 text-lg text-gray-800 py-3 px-4 border-b border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <span>
                    {purchased ? (
                      <PlayCircle size={22} className="text-blue-600" />
                    ) : (
                      <Lock size={22} className="text-gray-400" />
                    )}
                  </span>
                  <p className="text-xl font-medium text-gray-900">
                    {lecture.lectureTitle}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Video Preview & Purchase */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-lg rounded-lg bg-gradient-to-r from-red-600 to-blue-600">
            <CardContent className="p-6 flex flex-col">
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures?.[0]?.videoUrl || ""}
                  controls={true}
                />
              </div>
              <h1 className="text-xl font-semibold text-white">
                Lecture Preview
              </h1>
              <SelectSeparator className="my-3" />
              <h1 className="text-2xl font-bold text-white">
                ₹{course?.coursePrice || 0}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-xl"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
