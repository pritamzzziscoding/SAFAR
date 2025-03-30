import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Store files temporarily in "uploads/" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  // Initialize multer
  const upload = multer({ storage: storage });
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
      console.log(req.file);
  
      // Upload image to Cloudinary using the buffer
      console.log("File path: ",req.file.path);
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "safar_uploads", // Optional: Change the folder name as per your need
    //     resource_type: "image",
    //   });

      // Get Cloudinary image URL
      const imageUrl = await getImageUrl(req.file.path)
      console.log("Uploaded Image URL:", imageUrl);
  
      // Update database with new image URL
      const query = `UPDATE ${type} SET image_url = ? WHERE ${id_string} = ?`;
      await db.query(query, [imageUrl, id]);
      // Delete the image from the local folder 
      delete_local_file(req.file.path);
      // Send success response
      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully!",
        imageUrl,
      });
    } catch (error) {
      console.error("Error in imgUpload:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

export const getImageUrl = async (path) => {
  try{
    const result = await cloudinary.uploader.upload(path, {
        folder: "safar_uploads", // Optional: Change the folder name as per your need
        resource_type: "image",
      });

      // Get Cloudinary image URL
      const imageUrl = result.secure_url;
      return imageUrl;
    }catch(err){
          console.log(err);
          return ""
    }
}

export const delete_local_file = (path)=>{
  fs.unlink(path, (err) => {
    if (err) {
        console.error("Error deleting file:", err);
    } else {
        console.log("Local file deleted successfully");
    }
});
}
// Multer middleware for handling image upload
export const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
      if (err && err.code !== "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({ success: false, message: "File upload error" });
      }
      next();
  });
};

