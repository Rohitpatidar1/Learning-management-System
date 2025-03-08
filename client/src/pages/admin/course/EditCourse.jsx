import { Button } from "@/components/ui/button";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CourseTable from "./CourseTable";
import CourseTab from "./CourseTab";
function EditCourse() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-center gap-4 mb-5">
        <h1 className="font-bold text-xl">Add detailed information course</h1>
        <Link to="lecture">
          <Button variant="link" className="hover:text-blue-600">
            Go to lecture page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
}

export default EditCourse;
