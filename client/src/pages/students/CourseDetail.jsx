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
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return <h1 className="text-center text-2xl font-semibold">Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-center text-red-500 text-2xl font-semibold">
        Failed to load course details
      </h1>
    );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };
  console.log(purchased);

  return (
    <div className="space-y-10">
      <div className="bg-[#1E1F22] text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-bold text-3xl md:text-4xl mb-2 mt-12">
            {course?.courseTitle}
          </h1>
          <p className="text-lg text-gray-300">
            {course?.subTitle || "No subtitle available"}
          </p>
          <p className="mt-2 text-sm">
            Created by{" "}
            <span className="text-blue-400 underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0]}</p>
          </div>
          <p className="mt-2">
            Students enrolled:{" "}
            <span className="font-semibold">
              {course?.enrolledStudents?.length}
            </span>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3 space-y-6">
          <h1 className="font-bold text-2xl">Description</h1>
          <p
            className="text-gray-700 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          />
          <Card className="shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course?.lectures?.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-base text-gray-800"
                >
                  <span>
                    {purchased ? (
                      <PlayCircle size={18} />
                    ) : (
                      <Lock size={18} className="text-gray-500" />
                    )}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="shadow-lg rounded-lg">
            <CardContent className="p-6 flex flex-col">
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures?.[0]?.videoUrl || ""}
                  controls={true}
                />
              </div>
              <h1 className="text-lg font-semibold">Lecture Preview</h1>
              <SelectSeparator className="my-3" />
              <h1 className="text-xl font-bold">₹{course?.coursePrice || 0}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg"
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
