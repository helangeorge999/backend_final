import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const ctrl   = new AuthController();

router.post("/register",        ctrl.register.bind(ctrl));
router.post("/login",           ctrl.login.bind(ctrl));
router.post("/forgot-password", ctrl.forgotPassword.bind(ctrl));
router.post("/reset-password",  ctrl.resetPassword.bind(ctrl));

export default router;