import { refundButtonClicked } from "../controllers/refundController.js";
import express from "express"
const router = express.Router();
router.put("/refund-tourist",refundButtonClicked)
export default router;