import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route";


// ...existing code...

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5050, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5050}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
