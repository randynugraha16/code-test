import { Router } from "express";
let router = Router();
import { controller } from "./controller.js";

router.post("/register", controller.registerAccount);
router.post("/login", controller.loginAccount);

export const authRoutes = router;
