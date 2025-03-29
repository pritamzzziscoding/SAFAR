import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../controllers/uploadController.js";
import { getAllBlogs, insertblog } from "../controllers/blogController.js";
const router = express.Router();

router.post("/add-blog",authenticateUser,uploadMiddleware,insertblog);
router.get("/blogs",getAllBlogs)

export default router;