import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

function EditLecture() {
  const params = useParams();
  const courseId = params.courseId;
  return (
<div className="flex flex-col gap-5">
  {/* Back Button & Heading */}
  <div className="flex items-center gap-2">
    <Link to={`/admin/course/${courseId}/lecture`}>
      <Button size="icon" variant="outline" className="rounded-full">
        <ArrowLeft />
      </Button>
    </Link>
    <h1 className="text-2xl font-semibold">Update your lecture</h1>
  </div>

  {/* Lecture Form (Now it will be below the heading) */}
  <LectureTab />
</div>
  );
}

export default EditLecture;
