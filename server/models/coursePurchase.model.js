import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: function () {
        return this.status === "completed"; // ✅ Only required if payment is successful
      },
    },
  },
  { timestamps: true }
);

export const CoursePurchase = mongoose.model(
  "CoursePurchase",
  coursePurchaseSchema
);
