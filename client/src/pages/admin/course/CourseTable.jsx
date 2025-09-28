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
import { useNavigate } from "react-router-dom";

function CourseTable() {
  const { data, isLoading, error } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();
  const courses = data?.courses || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg ml-8 mr-12">
      {" "}
      {/* Increased right margin */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate("create")}
          className="bg-red-600 text-white hover:bg-red-700 py-2 px-5 rounded-lg"
        >
          Create new course
        </Button>
      </div>
      <Table className="w-full table-auto">
        <TableCaption>List of all your courses.</TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-200 text-blue-700">
            <TableHead className="w-[100px] text-left px-4 py-3">
              Price
            </TableHead>
            <TableHead className="text-left px-4 py-3">Status</TableHead>
            <TableHead className="text-left px-4 py-3">Title</TableHead>
            <TableHead className="text-right px-4 py-3">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course._id} className="border-b hover:bg-blue-50">
                <TableCell className="px-4 py-3">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge
                    className={
                      course.isPublished
                        ? "bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                        : "bg-yellow-500 text-white px-3 py-1 rounded-full text-sm"
                    }
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3">
                  {course.courseTitle}
                </TableCell>
                <TableCell className="text-right px-4 py-3">
                  <Button
                    onClick={() => navigate(`${course._id}`)}
                    className="bg-blue-500 text-white hover:bg-blue-600 rounded-full p-2"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-600 py-4">
                No courses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={3}
              className="font-medium text-gray-700 px-4 py-3"
            >
              Total Courses
            </TableCell>
            <TableCell className="text-right text-gray-800 px-4 py-3">
              {courses.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default CourseTable;
