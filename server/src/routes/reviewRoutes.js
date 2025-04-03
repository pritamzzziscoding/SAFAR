import express from "express";
import { addReview, getAllreviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/package-reviews/:id",getAllreviews)

export default router;