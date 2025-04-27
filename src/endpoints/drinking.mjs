import { Router } from "express";
import {bautura, getTotalSips, locatie} from "../utils/middleware/bautura.mjs";
import { authenticateToken} from "../utils/utilFunction.mjs";

const router = Router()

router.post("/sips", authenticateToken, bautura);
router.get("/pahar", authenticateToken, getTotalSips);
router.post("/locatie", authenticateToken, locatie);

export default router;