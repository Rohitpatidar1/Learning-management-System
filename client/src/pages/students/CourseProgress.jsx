import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load course details</p>
    );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 mt-12">
        <h1 className="text-2xl font-semibold text-center md:text-left">
          {courseTitle}
        </h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          {completed ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Completed</span>
            </>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/5 bg-white shadow-lg rounded-lg p-4">
          <video
            src={currentLecture?.videoUrl || initialLecture.videoUrl}
            controls
            className="w-full rounded-lg shadow-md"
            onPlay={() =>
              handleLectureProgress(currentLecture?._id || initialLecture._id)
            }
          />
          <h3 className="mt-3 text-lg font-medium">
            {`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            } : ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
          </h3>
        </div>

        <div className="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 pt-4 lg:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`p-3 transition duration-300 cursor-pointer ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-100 border border-gray-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={22} className="text-green-500" />
                    ) : (
                      <CirclePlay size={22} className="text-gray-500" />
                    )}
                    <CardTitle className="text-md font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
