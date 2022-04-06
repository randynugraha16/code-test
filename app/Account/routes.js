import { Router } from "express";

let router = Router();
import { controller } from "./controller.js";

router.get("/account-number", controller.getAccountByAccountNumber);
router.get("/identity-number", controller.getAccountByIndentityNumber);
router.put("/", controller.updateAccount);
router.delete("/", controller.deleteAccount);

export const accountRoutes = router;
