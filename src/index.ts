import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5050, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5050}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
