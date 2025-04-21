import express, { Router } from "express";
import { signup } from "../controllers/auth.controller";
import {signupValidation , validate} from "../middlewares/auth.validation"

const router: Router = express.Router();

router.post("/" , validate(signupValidation) , signup);

export default router;
