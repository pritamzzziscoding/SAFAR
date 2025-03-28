import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(authRoutes);
app.get("/", (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      return res.status(200).json({
        success: true,
        message: "Cookie hai chup chaap redirect hojaa!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
app.get("/type", async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    const decoded = jwt.verify(token, "ijinwincwifjqun");
    const type = decoded.type;
    res.status(200).json({
      success: true,
      type,
      message: "Type nahi pata chala kya ? Refresh kar!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});
app.use("/package", packageRoutes);
app.use("/review", reviewRoutes);
app.use("/book", bookingRoutes);
export default app;
