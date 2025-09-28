import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

function EditLecture() {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-lg">
      {/* Back Button & Heading */}
      <div className="flex items-center gap-4">
        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Update Your Lecture
        </h1>
      </div>

      {/* Space Between Heading and Form */}
      <div className="mt-6">
        {/* Lecture Form Component */}
        <LectureTab />
      </div>
    </div>
  );
}

export default EditLecture;
