import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads", "profile");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

// Allowed image extensions
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"];

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    // Check MIME type first
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    // Fallback: check file extension (Flutter sometimes sends application/octet-stream)
    const ext = path.extname(file.originalname).toLowerCase();
    if (imageExtensions.includes(ext)) {
      return cb(null, true);
    }

    return cb(new Error("Only image files are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});