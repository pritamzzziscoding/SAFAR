import express from "express"
import { checkout,paymentVerification } from "../controllers/paymentController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/order",authenticateUser,checkout)
router.route("/paymentVerification").post(paymentVerification)
export default router; 