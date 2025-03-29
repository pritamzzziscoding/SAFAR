import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../controllers/uploadController.js";
import { deleteblog, getAllBlogs, getCurrentLike, insertblog, likehelper } from "../controllers/blogController.js";
const router = express.Router();

router.post("/add-blog",authenticateUser,uploadMiddleware,insertblog);
router.get("/blogs",getAllBlogs)
router.delete("/delete-blog",deleteblog)
router.post("/like",authenticateUser,likehelper)
router.get("/currentLike/:BlogID",authenticateUser,getCurrentLike)
export default router;