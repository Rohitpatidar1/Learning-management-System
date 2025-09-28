import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    const response = await createLecture({ lectureTitle, courseId });
    console.log(response); // ✅ Sirf ek baar console par data dekhne ke liye
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
      console.log(data);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="flex-1 mx-10 p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900">Let's add lectures</h1>
        <p className="text-sm text-gray-600">
          Add some basic details for your new lecture. Provide a meaningful
          title.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium text-gray-700">Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter Lecture Title"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-lg"
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className={`${
              isLoading
                ? "bg-blue-500 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } px-6 py-2 rounded-lg flex items-center gap-2`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        {/* Render Lectures */}
        <div className="mt-8">
          {lectureLoading ? (
            <p className="text-gray-500">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-500">Failed to load lectures</p>
          ) : !lectureData || lectureData.lectures.length === 0 ? (
            <p className="text-gray-500">No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
