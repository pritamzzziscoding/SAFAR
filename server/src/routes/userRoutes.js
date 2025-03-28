import express from "express" ; 
const router = express.Router();
import { getDetails,imgUpdate,nameUpdate } from "../controllers/userController.js";


router.get("/details", getDetails);
router.put("/update-image",imgUpdate);
router.put("/update-name",nameUpdate);
export default router;

