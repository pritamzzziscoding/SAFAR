import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-page", signup);
router.post("/login-page", login);
router.get("/logout", logout);

export default router;
