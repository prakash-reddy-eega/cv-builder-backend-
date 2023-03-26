import { Router } from "express";
const router = Router()
import { jwtValidation } from "../../middlewares/authValiation.js";
import { addCv, getCvs, editCv, deleteCv } from "./controller.js";


router.post('/save-cv',jwtValidation, addCv)
router.get('/cvs', jwtValidation, getCvs)
router.put('/edit-cv/:id',jwtValidation, editCv)
router.delete('/delete/:id',jwtValidation, deleteCv)


export default router