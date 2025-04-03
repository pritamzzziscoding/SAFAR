import { cancelButtonClicked } from "../controllers/cancelController.js";
import express from "express"
const router = express.Router();
router.put("/cancel-booking",cancelButtonClicked)

export default router