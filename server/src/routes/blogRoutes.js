import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import { uploadMiddleware } from "../controllers/uploadController";
const router = express.Router();

router.post("/add-blog",authenticateUser,uploadMiddleware,insertblog);

export default router;