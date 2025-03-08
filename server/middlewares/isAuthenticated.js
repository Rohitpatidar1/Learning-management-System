import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies); // ✅ Debugging
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuthenticated;
