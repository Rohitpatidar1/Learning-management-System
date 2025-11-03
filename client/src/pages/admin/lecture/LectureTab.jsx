import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useParams } from "react-router-dom";

const MEDIA_API =
  "https://learning-management-system-2-dprm.onrender.com";

function LectureTab() {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setuploadVideInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { courseId, lectureId } = params;
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);

  const lecture = lectureData?.lecture;
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setuploadVideInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      setMediaProgress(true);
      formData.append("file", file);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setuploadVideInfo({
            videoUrl: res.data.data.secure_url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation(); // ✅ Correct Mutation for Remove Lecture

  const editLectureHandler = async () => {
    console.log({
      lectureTitle,
      uploadVideInfo,
      isFree,
      courseId,
      lectureId,
    });

    await editLecture({
      lectureTitle,
      // videoinf: uploadVideInfo,
      videoInfo: uploadVideInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture({ courseId, lectureId }); // ✅ Ensure correct API parameters
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully!");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess && removeData) {
      toast.success(removeData?.message || "Lecture removed successfully!"); // ✅ Safe Access
    }
  }, [removeSuccess, removeData]);
  return (
    <Card className="shadow-md">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={removeLectureHandler}
            className="bg-red-600"
          >
            remove lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Ex. Introduction to Javascript"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>
              Video <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="video/*"
              className="w-fit"
              onChange={fileChangeHandler}
            />
          </div>
          <div className="flex items-center space-x-2 my-5">
            <Switch
              checked={isFree}
              onCheckedChange={setIsFree}
              id="airplane-mode"
            />
            <Label htmlFor="airplane-mode">Is this video FREE</Label>
          </div>

          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )}

          <div className="mt-4">
            <Button onClick={editLectureHandler}>Update Lecture</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LectureTab;
