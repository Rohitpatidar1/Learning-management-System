import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  razorpayWebhook,
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

// ✅ Placeholder for future implementation
router.route("/course/:courseId/detail-with-status").get((req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

// ✅ Placeholder for future implementation
router.route("/").get((req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

export default router;
