import { Router } from "express";
const router = Router()
import { authRules, validationCheck } from "../../middlewares/feildValidation.js";
import { userLogin, userRegistration, getProfileDetails, uploadProfilePic, removeProfilePic } from "./controller.js";
import { jwtValidation } from "../../middlewares/authValiation.js";



router.post('/login', [authRules.login, validationCheck, userLogin])
router.post('/register', [authRules.signUp, validationCheck, userRegistration])
router.get('/profile', jwtValidation, getProfileDetails)
router.post('/upload-profile/:id', jwtValidation, uploadProfilePic)
router.post('/remove-profile/:id', jwtValidation, removeProfilePic)

export default router