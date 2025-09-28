// import express from "express";
// import connectDB from "./database/db.js";
// import userRouter from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import mediaRoute from "./routes/media.route.js";
// import purchaseRoute from "./routes/purchaseCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";
// dotenv.config();

// // Database connection
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(
//   express.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     },
//   })
// ); // Preserve rawBody for webhook verification
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: ["http://localhost:5174", "http://localhost:5173"],
//     credentials: true,
//   })
// );

// // API Routes
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);

// app.get("/home", (_, res) => {
//   res.status(200).json({ success: true, message: "Hello Programmer" });
// });

// // Global Error Handling
// process.on("uncaughtException", (err) => {
//   console.error("Unhandled Exception:", err);
// });

// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err);
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

import express from "express";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: ["https://your-frontend.netlify.app"], // replace with your Netlify URL
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Test route
// Test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// Global Error Handling
process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
