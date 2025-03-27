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
app.use("/package", packageRoutes);
app.use("/review", reviewRoutes);
app.use("/book", bookingRoutes);
export default app;
