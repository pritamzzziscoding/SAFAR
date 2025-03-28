import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import dotenv from "dotenv";

dotenv.config({
    path:"C:\Users\divya\OneDrive\safar_final_practice\SAFAR\server\src\config\.env"
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to handle file upload
export const imgUpload = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, "ijinwincwifjqun");
    const id = decoded.id;
    const type = decoded.type;
    const id_string = type === "tourist" ? "TouristID" : "AgencyID";

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, cloudinaryResult) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
      }

      // Get Cloudinary image URL
      const imageUrl = cloudinaryResult.secure_url;

      // Update database with new image URL
      const query = `UPDATE ${type} SET image_url = ? WHERE ${id_string} = ?`;
      await db.query(query, [imageUrl, id]);

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully!",
        imageUrl,
      });
    });

    // Pipe file to Cloudinary
    req.file.stream.pipe(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Multer middleware for handling image upload
export const uploadMiddleware = upload.single("image");
