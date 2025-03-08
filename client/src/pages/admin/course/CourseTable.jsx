import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CourseTable() {
  const { data, isLoading, error } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();
  const courses = data?.courses || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // const courses = Array.isArray(data) ? data : data?.courses || [];
  console.log("data-->", data);

  return (
    <div>
      <Button onClick={() => navigate("create")}>Create new course</Button>
      <Table>
        <TableCaption>List of available courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            data.courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      course.isPublished
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => navigate(`${course._id}`)}>
                    <Edit></Edit>fai
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No courses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Courses</TableCell>
            <TableCell className="text-right">{courses.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default CourseTable;
