import express from "express" ; 
const router = express.Router();
import { getDetails,nameUpdate,passwordUpdate } from "../controllers/userController.js";


router.get("/details", getDetails);
// router.put("/update-image",imgUpdate);
router.put("/update-name",nameUpdate);
router.put("/update-password",passwordUpdate);
export default router;

