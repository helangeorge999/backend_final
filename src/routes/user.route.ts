import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import User from "../models/user.model";

const router = express.Router();

// Ensure upload folder exists
const uploadPath = "uploads/profile";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload-photo", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photoPath = `/uploads/profile/${req.file.filename}`;

    await User.findByIdAndUpdate(userId, {
      photoUrl: photoPath,
    });

    return res.status(200).json({
      message: "Photo uploaded",
      url: photoPath,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
