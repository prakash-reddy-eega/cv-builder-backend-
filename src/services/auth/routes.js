import { Router } from "express";
const router = Router()
import { authRules, validationCheck } from "../../middlewares/feildValidation.js";
import { userLogin, userRegistration } from "./controller.js";



router.post('/login', [authRules.login, validationCheck, userLogin])
router.post('/register', [authRules.signUp, validationCheck, userRegistration])


export default router