import mongoose from "mongoose";
import { Course } from "../models/course.model.js"; // ✅ Fix: Course model import
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
  deleteVideoFromCloudinary,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    console.log("Creator ID:", req.id);
    console.log("Request Body:", req.body);

    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "Title and Category are required" });
    }

    if (!req.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res
      .status(201)
      .json({ course, message: "Course created successfully" });
  } catch (error) {
    console.error("Course Creation Error:", error); // 🔍 Debugging
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    console.log("Creator ID:", req.id); // ✅ Debugging

    if (!req.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const courses = await Course.find({ creator: req.id });

    console.log("Fetched Courses:", courses);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error Fetching Courses:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    let courseThumbnail = course.courseThumbnail; // Default old thumbnail

    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); // Delete old image
      }

      // ✅ FIX: Upload file from buffer
      const uploadResponse = await uploadMedia(thumbnail.buffer);
      courseThumbnail = uploadResponse?.secure_url || course.courseThumbnail;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res
      .status(200)
      .json({ course, message: "Course updated successfully." });
  } catch (error) {
    console.log("Edit Course Error:", error);
    return res.status(500).json({ message: "Failed to update course" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};

//lecture create
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res
        .status(400)
        .json({ message: "Lecture title and Course ID are required" });
    }

    const lecture = await Lecture.create({ lectureTitle });
    await lecture.save(); // ✅ Fix: Ensure lecture is saved

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(lecture._id);
    await course.save();

    return res
      .status(201)
      .json({ lecture, message: "Lecture created successfully" });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return res.status(500).json({ message: "Failed to create lecture" });
  }
};

// Get Lectures of a Course
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    // update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture id if it was not aleardy added;
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lectures",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    //delete the lecture from coulidinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    //remove lecture reference from the associated course
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res.status(200).json({
      message: "lecture remove successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Faild to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "faild to get tecture",
    });
  }
};

//publish unpublish course logic
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    // Validate publish query
    if (publish !== "true" && publish !== "false") {
      return res.status(400).json({
        message: "Invalid value for 'publish'. Use 'true' or 'false'.",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure publish is a boolean value
    course.isPublished = publish === "true";
    await course.save();

    return res.status(200).json({
      message: `Course ${course.isPublished ? "published" : "unpublished"}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update status" });
  }
};
