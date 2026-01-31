import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ safer static path
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5050, () => {
      console.log(
        `🚀 Server running at http://localhost:${process.env.PORT || 5050}`
      );
    });
  })
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err)
  );
