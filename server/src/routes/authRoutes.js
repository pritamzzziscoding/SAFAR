import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-page", signup);
router.post("/login-page", login);

export default router;
