import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { addReview, getAllreviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/rating",authenticateUser,addReview);
router.get("/package-reviews/:id",getAllreviews)

export default router;