import express from "express" ; 
const router = express.Router();
import { getDetails,imgUpdate } from "../controllers/userController.js";


router.get("/details", getDetails);
router.put("/update-image",imgUpdate);

export default router;

