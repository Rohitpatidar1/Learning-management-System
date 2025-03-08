import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function Course() {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://freeprojectscodes.com/wp-content/uploads/2022/06/React-js-projects-for-beginners-with-source-code.png"
          alt=""
        />
      </div>
      {/* <CardContent className="px-5 py-4 space-y-3"> */}
      <h1 className="hover:underline font-bold text-lg truncate">
        React js complete course
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="WhatsApp Image 2024-12-05 at 8.05.08 PM.jpeg"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm">Rohit patidar</h1>
        </div>
        <Badge
          className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"}
        >
          Advanced
        </Badge>
      </div>
      <div className="text-lg font-bold">
        <span>₹499</span>
      </div>
      {/* </CardContent> */}
    </Card>
  );
}

export default Course;
