import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MONGODB_URI } from "./config/env";
import Admin from "./models/admin.model";

async function seed() {
  await mongoose.connect(MONGODB_URI);

  const existing = await Admin.findOne({ email: "admin@gmail.com" });
  if (existing) {
    console.log("✅ Admin already exists");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("admin123", 10);
  await Admin.create({
    name: "Super Admin",
    email: "admin@gmail.com",
    password: hashed,
  });

  console.log("✅ Admin created: admin@gmail.com / admin123");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});