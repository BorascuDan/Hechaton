import { Router } from "express";
import {bautura, location, pahare} from "../utils/middleware/bautura.mjs";
import { authenticateToken} from "../utils/utilFunction.mjs";

const router = Router()

router.post("/sips", authenticateToken, bautura);
router.post("/locatie", authenticateToken, location);
router.get("/pahar", authenticateToken, pahare);
export default router;