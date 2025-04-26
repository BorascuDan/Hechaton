import { Router } from "express";
import { dataSenzor, temperatura } from "../utils/middleware/data.mjs";
import { authenticateToken} from "../utils/utilFunction.mjs";

const router = Router()

router.post("/insert", authenticateToken, dataSenzor);
router.get("/lastTemp", authenticateToken, temperatura)

export default router;