import dotenv from "dotenv";
dotenv.config();

export const PORT        = process.env.PORT ? parseInt(process.env.PORT) : 5050;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/defaultdb";
export const JWT_SECRET  = process.env.JWT_SECRET  || "default_secret";
export const HOST_URL    = process.env.HOST_URL    || "http://localhost:5050";