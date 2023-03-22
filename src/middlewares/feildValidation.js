import { check,validationResult } from "express-validator";
import { APIResponse } from "../utils/common.js";

export const validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.errors.length) {
        res.send(new APIResponse(0, "Error", errors));
    } else {
        next();
    }
}

export const authRules = {
    signUp: [
        check("name").notEmpty().withMessage("Name is required"),
        check("username").notEmpty().withMessage("Name is required"),
        check("email").isEmail().withMessage("Valid Email required"),
        check("contactNumber").isInt().notEmpty().withMessage("contact number is required"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
        check("confirmPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 character long")
    ],
    login: [
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
    ]
} 