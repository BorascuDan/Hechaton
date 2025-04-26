import { Router } from "express";
import users from "./../endpoints/users.mjs"
import senzor from "./../endpoints/snezor.mjs"

//import componenta from "./../endpoints/componenta";
const router = Router()

//router.use('/name/', componenta);
router.use('/users/', users);
router.use('/senzor/', senzor)

export default router;