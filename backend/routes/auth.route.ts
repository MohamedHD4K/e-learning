import express, { Router } from "express";
import { forgotPassword, login, resetPassword, signup, loginWithGoogleAccount } from "../controllers/auth.controller";
import { loginValidation, signupValidation , validate} from "../middlewares/auth.validation";

const router: Router = express.Router();

router.post("/signup", validate(signupValidation), signup);

router.post("/login", validate(loginValidation), login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/google/login" , loginWithGoogleAccount)

export default router;
