import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db";
import { PORT } from "./config/env";

import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import busRouter from "./routes/bus.route";           
import bookingRouter from "./routes/booking.route";   

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/buses", busRouter);           
app.use("/api/bookings", bookingRouter);    

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
  });
});