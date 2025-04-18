import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../controllers/uploadController.js";
import {
  getPackageDetails,
  PackageAdder,
  deletePackage,
  filterData,
  getPackages,
  updatePackage,
  updateStatus
} from "../controllers/packageController.js";

const router = express.Router();
router.get("/get-package/:packageID", getPackageDetails);
router.post("/add-package",authenticateUser,uploadMiddleware,PackageAdder);
router.get("/agency-packages",authenticateUser,getPackages);
router.put("/toggle-package",updateStatus);
router.delete("/delete-package",deletePackage);
router.put("/update-package",uploadMiddleware,updatePackage);
router.post("/filter-package",filterData);

export default router;
