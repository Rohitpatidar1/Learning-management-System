import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";

function CourseTab() {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

  const [publishCourse, {}] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const updateCourseHandler = async () => {
    const formdata = new FormData();
    formdata.append("courseTitle", input.courseTitle);
    formdata.append("subTitle", input.subTitle);
    formdata.append("description", input.description);
    formdata.append("category", input.category);
    formdata.append("courseLevel", input.courseLevel);
    formdata.append("coursePrice", input.coursePrice);

    if (input.courseThumbnail) {
      formdata.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData: formdata, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, publish: action });
      if (response.data) {
        toast.success(response.data.message);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading..</h1>;

  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <CardHeader className="flex justify-between items-center mb-6">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900 text-center">
            Basic Course Information
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex space-x-4 justify-start">
          <Button
            disabled={courseByIdData?.course.lectures?.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-lg"
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>

          <Button className="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-lg">
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-700">Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack developer"
            className="w-full p-3 mt-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <Label className="text-gray-700">Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            className="w-full p-3 mt-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <Label className="text-gray-700">Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-700">Category</Label>
            <Select
              defaultValue={input.category}
              onValueChange={selectCategory}
              className="w-full mt-2"
            >
              <SelectTrigger className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-auto mt-2 z-10 bg-white shadow-lg rounded-lg border border-gray-300">
                <SelectGroup>
                  <SelectLabel className="text-gray-700 font-semibold">
                    Categories
                  </SelectLabel>
                  <SelectItem
                    value="Next JS"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Next JS
                  </SelectItem>
                  <SelectItem
                    value="Data Science"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Data Science
                  </SelectItem>
                  <SelectItem
                    value="Frontend Development"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Frontend Development
                  </SelectItem>
                  <SelectItem
                    value="Full Stack Development"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Fullstack Development
                  </SelectItem>
                  <SelectItem
                    value="MERN Stack Development"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem
                    value="Javascript"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Javascript
                  </SelectItem>
                  <SelectItem
                    value="Python"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Python
                  </SelectItem>
                  <SelectItem
                    value="Docker"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    Docker
                  </SelectItem>
                  <SelectItem
                    value="MongoDB"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    MongoDB
                  </SelectItem>
                  <SelectItem
                    value="HTML"
                    className="py-2 px-4 hover:bg-gray-100"
                  >
                    HTML
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700">Course Level</Label>
            <Select
              defaultValue={input.courseLevel}
              onValueChange={selectCourseLevel}
              className="w-full mt-2"
            >
              <SelectTrigger className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400">
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Levels</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700">Price in (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="199"
              className="w-full p-3 mt-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <Label className="text-gray-700">Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="mt-2"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-32 mt-2 rounded-lg"
              alt="Course Thumbnail"
            />
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => navigate("/admin/course")}
            variant="outline"
            className="text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={updateCourseHandler}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseTab;
