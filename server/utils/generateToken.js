import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // <-- ISE 'true' KAR DEIN
    sameSite: "none", // <-- ISE 'none' KAR DEIN
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
