import express from "express";
import {
  getPackageDetails,
  setnewpackage,
} from "../controllers/packageController.js";

const router = express.Router();
router.post("/new", setnewpackage);
router.get("/:packageID", getPackageDetails);

export default router;
