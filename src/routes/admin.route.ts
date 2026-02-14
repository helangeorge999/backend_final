import { Router } from "express";
import { AdminAuthController } from "../controllers/admin-auth.controller";
import { AdminController }     from "../controllers/admin.controller";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";

const router   = Router();
const authCtrl = new AdminAuthController();
const mgmtCtrl = new AdminController();

// Public
router.post("/auth/register", authCtrl.register.bind(authCtrl));
router.post("/auth/login",    authCtrl.login.bind(authCtrl));

// Protected — valid admin JWT required
router.use(authenticate, requireAdmin);
router.get("/users",        mgmtCtrl.getAllUsers.bind(mgmtCtrl));
router.patch("/users/:id",  mgmtCtrl.updateUser.bind(mgmtCtrl));
router.delete("/users/:id", mgmtCtrl.deleteUser.bind(mgmtCtrl));

export default router;