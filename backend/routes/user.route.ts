import express, { Router } from "express";
import { user, users } from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/:username", user);

router.get("/", users);

export default router;
