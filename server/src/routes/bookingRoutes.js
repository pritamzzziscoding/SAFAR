import express from "express";
import { booking } from "../controllers/bookingController.js";
const router = express.Router();

router.post("/new", booking);

export default router;
