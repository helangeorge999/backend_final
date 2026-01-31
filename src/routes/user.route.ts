import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();
const ctrl = new UserController();

router.get("/profile", ctrl.getProfile.bind(ctrl));
router.post("/upload-photo", upload.single("file"), ctrl.uploadPhoto.bind(ctrl));

export default router;
