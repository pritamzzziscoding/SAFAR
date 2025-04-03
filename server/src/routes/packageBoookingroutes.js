import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getAllBookings } from "../controllers/packageBookingController.js";
import express from "express"
const router = express.Router();
router.get("/package-bookings/:id",authenticateUser,getAllBookings);
export default router