import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeAdmin } from "../middleware/authorized.middleware";

const router = Router();
const controller = new BookingController();

// User routes
router.post("/", authenticate, controller.create.bind(controller));
router.get("/my-bookings", authenticate, controller.getUserBookings.bind(controller));
router.patch("/:id/cancel", authenticate, controller.cancel.bind(controller));

// Admin routes
router.get("/", authenticate, authorizeAdmin, controller.getAll.bind(controller));

export default router;