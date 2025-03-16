import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  razorpayWebhook,
  getCourseDetailWithPurchaseStatus,
  getAllPurchasedCourse,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Webhook ke liye raw body preserve karna zaroori hai
router.use(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

router.route("/webhook").post(razorpayWebhook);

router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
