import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate }   from "../middleware/auth.middleware";
import { upload }         from "../middleware/upload.middleware";

const router = Router();
const ctrl   = new UserController();

router.get("/profile",     authenticate, ctrl.getProfile.bind(ctrl));
router.patch("/profile",   authenticate, ctrl.updateProfile.bind(ctrl));
router.post("/upload-photo", authenticate, upload.single("file"), ctrl.uploadPhoto.bind(ctrl));

export default router;