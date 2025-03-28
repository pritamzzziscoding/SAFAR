import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import {db} from "./config/database.js";

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
app.get("/details", async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    const decoded = jwt.verify(token, "ijinwincwifjqun");
    const type = decoded.type;
    const id = decoded.id ;
    const id_string = type==='tourist'?"TouristID":"AgencyID";
    const query = `SELECT email,firstname,lastname,phoneno,image_url FROM ${type} WHERE ${id_string} = ? `
    const result = await db.query(query,[id]);
    console.log(result);
    result[0][0]["type"] = type;
    res.status(200).json({
      success: true,
      result:result[0][0],
      message: "Details nahi pata chali kya ? Refresh kar!",
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
