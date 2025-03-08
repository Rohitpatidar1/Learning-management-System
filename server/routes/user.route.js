// import express from "express";
// import {
//   getUserProfile,
//   login,
//   logout,
//   register,
//   updateProfile,
// } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// const router = express.Router();
// import upload from "../middlewares/multer.js";

// router.route("/register").post(register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile").get(isAuthenticated, getUserProfile);
// router.route("/profile/update").put(isAuthenticated, updateProfile);

// export default router;

import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js"; // ✅ Multer middleware import

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);

// ✅ File upload support ke liye `upload.single("profilePhoto")` add kiya
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;
