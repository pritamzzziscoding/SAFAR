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
app.use(cors());
app.use(cookieParser());
app.use(authRoutes);
app.get("/", (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      return res.redirect("/home");
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
app.get("/type", async (req, res) => {
  try {
    const { token } = req.cookies;
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
