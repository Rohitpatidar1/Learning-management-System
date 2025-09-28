import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddCourse() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const createCourseHandler = async () => {
    try {
      await createCourse({ courseTitle, category }).unwrap();
      toast.success("Course created successfully");
    } catch (err) {
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, data, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-gray-900 font-semibold text-2xl">
          Add a New Course
        </h1>
        <p className="text-gray-600 text-sm">
          Fill in the details below to create a new course.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <Label className="text-gray-700">Course Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course name"
            className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <Label className="text-gray-700">Category</Label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Full Stack Development">
                  Full Stack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/course")}
          className="bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-6 py-2"
        >
          Back
        </Button>
        <Button
          disabled={isLoading}
          onClick={createCourseHandler}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 rounded-lg px-6 py-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
}

export default AddCourse;
