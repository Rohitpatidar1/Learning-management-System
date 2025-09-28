import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

function Course({ course }) {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg bg-gradient-to-r from-red-200 via-blue-500 to-white dark:from-gray-200 dark:via-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-48 object-cover"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="font-bold text-lg text-black hover:underline truncate">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course.creator?.photoUrl ||
                    "WhatsApp Image 2024-12-05 at 8.05.08 PM.jpeg"
                  }
                  alt={course.creator?.name || "@creator"}
                />
                <AvatarFallback>{course.creator?.name?.[0]}</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm text-black dark:text-gray-300">
                {course.creator?.name}
              </h1>
            </div>
            <Badge className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold text-black">
            <span>₹ {course.coursePrice}</span> {/* Added ₹ sign */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Course;
