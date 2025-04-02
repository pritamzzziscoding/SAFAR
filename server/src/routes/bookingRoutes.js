import express from "express";
import { getBookingDetails, showAllBookings } from "../controllers/bookingController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/tourist-bookings",authenticateUser, showAllBookings);
router.get("/tourist-bookings/:id",getBookingDetails);

export default router;
