import { Router } from "express";
let router = Router();
import { controller } from "./controller.js";

router.get("/account-number/:id", controller.getAccountByAccountNumber);
router.get("/identity-number/:id", controller.getAccountByIndentityNumber);

export const apiRoutes = router;
