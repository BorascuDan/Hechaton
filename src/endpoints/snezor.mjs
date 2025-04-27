import { Router } from "express";
import { dataSenzor, temperatura, sperow } from "../utils/middleware/data.mjs";
import { authenticateToken} from "../utils/utilFunction.mjs";

const router = Router()

router.post("/insert", authenticateToken, dataSenzor);
router.get("/lastTemp", authenticateToken, temperatura)
router.get("/zgomot&temp", authenticateToken, sperow)

export default router;