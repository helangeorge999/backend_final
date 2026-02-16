import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors    from "cors";
import path    from "path";

import { connectDB } from "./config/db";
import { PORT }      from "./config/env";

import authRouter  from "./routes/auth.route";
import userRouter  from "./routes/user.route";
import adminRouter from "./routes/admin.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth",  authRouter);
app.use("/api/user",  userRouter);
app.use("/api/admin", adminRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

connectDB().then(async () => {
  // ── TEMPORARY: drop stale username index ─────────────────────────────────
  // Remove these 8 lines after running the server once
  try {
    const mongoose = await import("mongoose");
    await mongoose.default.connection.collection("users").dropIndex("username_1");
    console.log("✅ Dropped stale username_1 index");
  } catch (e: any) {
    console.log("ℹ️  username_1 index not found (already dropped):", e.message);
  }
  // ── END TEMPORARY ─────────────────────────────────────────────────────────

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});