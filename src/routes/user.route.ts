import express from "express";
import multer from "multer";
import path from "path";
import { UserController } from "../controllers/user.controller";

const router = express.Router();
const ctrl = new UserController();

// Upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/profile", ctrl.getProfile.bind(ctrl));
router.post("/upload-photo", upload.single("file"), ctrl.uploadPhoto.bind(ctrl));

export default router;
