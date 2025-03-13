import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";
import { Lecture } from "../models/lecture.model.js";
import mongoose from "mongoose";
// import Payment from "../models/paymentModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay Order
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    let courseId = req.body.courseId?.toString().trim();

    // Debugging
    console.log("Raw courseId from req.body:", req.body.courseId);
    console.log("Type of courseId:", typeof req.body.courseId);

    // Validate courseId
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create a Razorpay order
    const options = {
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `r_${userId.slice(-5)}_${courseId.slice(-5)}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    if (!order.id) {
      return res.status(400).json({ message: "Error while creating order" });
    }

    newPurchase.paymentId = order.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // ✅ Send key for frontend
    });
  } catch (error) {
    console.error("Checkout Session Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// ✅ Razorpay Webhook for Payment Success
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    // ✅ Generate Expected Signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    console.log("Received Signature:", signature);
    console.log("Expected Signature:", expectedSignature);

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body;

    if (event.event === "payment.captured") {
      console.log("✅ Payment Captured:", event.payload.payment.entity);

      const payment = event.payload.payment.entity;
      const purchase = await CoursePurchase.findOne({
        paymentId: payment.order_id, // ✅ Corrected ID usage
      }).populate("courseId");

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      purchase.amount = payment.amount / 100;
      purchase.status = "completed";
      await purchase.save();

      // ✅ Enroll User & Update Course
      await User.findByIdAndUpdate(purchase.userId, {
        $addToSet: { enrolledCourses: purchase.courseId._id },
      });
      await Course.findByIdAndUpdate(purchase.courseId._id, {
        $addToSet: { enrolledStudents: purchase.userId },
      });

      console.log("✅ Payment Success & Database Updated");
    }

    res.status(200).send();
  } catch (error) {
    console.error("⚠️ Webhook Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
