import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "ijinwincwifjqun"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login again!" });
  }
};
