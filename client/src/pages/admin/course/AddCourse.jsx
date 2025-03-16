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
    <>
      <div className="flex-1 mx-10">
        <h1 className="font-bold text-xl">Let's add a course</h1>
        <p className="text-sm">Add some basic details for the new course</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
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
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate("/admin/course")}>
          Back
        </Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Please wait
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </>
  );
}

export default AddCourse;
