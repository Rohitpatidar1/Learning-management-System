import express from "express";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mediaRoute from "./routes/media.route.js";

dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5176", "http://localhost:5175"],
    credentials: true, // ✅ Bas ek baar likhna hai
  })
);

// API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);

app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "hello Programmer",
  });
});

// ✅ Global Error Handling (Server Crash Fix)
process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
