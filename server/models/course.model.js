import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true, // ✅ Typo fix
      unique: true, // ✅ Same title wale courses avoid karo
    },
    subTitle: {
      type: String,
      default: "", // ✅ Default empty string, taaki undefined na aaye
    },
    description: {
      type: String,
      default: "No description available", // ✅ Default description
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Next JS",
        "Data Science",
        "Frontend Development",
        "Full Stack Development",
        "MERN Stack Development",
        "Javascript",
        "Python",
        "Docker",
        "MongoDB",
        "HTML",
      ], // ✅ Enum use kiya
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Medium", "Advance"],
      default: "Beginner", // ✅ Default value
    },
    coursePrice: {
      type: Number,
      default: 0, // ✅ Default 0 for free courses
    },
    courseThumbnail: {
      type: String,
      default: "", // ✅ Default empty string
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ Creator required hona chahiye
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
