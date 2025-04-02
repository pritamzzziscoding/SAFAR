import express from "express";
import { addReview, getAllreviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/allreviews/:id",getAllreviews)

export default router;