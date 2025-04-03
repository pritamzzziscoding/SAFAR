import { cancelButtonClicked } from "../controllers/cancelController.js";
import express from "express"
const router = express.Router();
router.post("/cancel-booking",cancelButtonClicked)