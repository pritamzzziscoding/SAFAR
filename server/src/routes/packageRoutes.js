import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../controllers/uploadController.js";
import {
  // getPackageDetails,
  PackageAdder,
  getPackages
} from "../controllers/packageController.js";

const router = express.Router();
// router.get("/:packageID", getPackageDetails);
router.post("/add-package",authenticateUser,uploadMiddleware,PackageAdder);
router.get("/getPackages",authenticateUser,getPackages);

export default router;
