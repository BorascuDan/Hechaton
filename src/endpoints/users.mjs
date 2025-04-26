import { Router } from "express";
import db from './../utils/database.mjs';
import { registerUsers, loginUser, deleteUser, getDetails} from "../utils/middleware/login.mjs";
import { authenticateToken, sendJsonResponse } from "../utils/utilFunction.mjs";
import { personalDetails } from "../utils/middleware/personalData.mjs";
import { userPreferences } from "../utils/middleware/userPreferences.mjs";

const router = Router()

router.post("/register", registerUsers);
router.post("/login", loginUser);
router.post("/delete", authenticateToken, deleteUser);
router.post("/personalDetails", authenticateToken, personalDetails);
router.post("/userPreferences", authenticateToken, userPreferences);
router.get("/get", authenticateToken, getDetails);

export default router;