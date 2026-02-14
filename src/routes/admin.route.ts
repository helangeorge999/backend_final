import { Router } from "express";
import { AdminAuthController } from "../controllers/admin-auth.controller";
import { AdminController } from "../controllers/admin.controller";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";

const router = Router();
const authCtrl = new AdminAuthController();
const mgmtCtrl = new AdminController();

// ── Public admin auth routes ─────────────────────────────────────────────────
// POST /api/admin/auth/register  (lock this down in production)
// POST /api/admin/auth/login
router.post("/auth/register", authCtrl.register.bind(authCtrl));
router.post("/auth/login",    authCtrl.login.bind(authCtrl));

// ── Protected admin management routes ───────────────────────────────────────
// All routes below require a valid admin JWT
router.use(authenticate, requireAdmin);

router.get("/users",           mgmtCtrl.getAllUsers.bind(mgmtCtrl));
router.patch("/users/:id",     mgmtCtrl.updateUser.bind(mgmtCtrl));
router.delete("/users/:id",    mgmtCtrl.deleteUser.bind(mgmtCtrl));

export default router;