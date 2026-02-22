import { Router } from "express";
import { BusController } from "../controllers/bus.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeAdmin } from "../middleware/authorized.middleware";

const router = Router();
const controller = new BusController();

// Public routes
router.get("/search", controller.search.bind(controller));
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));

// Admin only routes
router.post("/", authenticate, authorizeAdmin, controller.create.bind(controller));
router.patch("/:id", authenticate, authorizeAdmin, controller.update.bind(controller));
router.delete("/:id", authenticate, authorizeAdmin, controller.delete.bind(controller));

export default router;