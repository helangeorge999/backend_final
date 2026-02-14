import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export interface AuthRequest extends Request {
  user?: { userId?: string; adminId?: string; role: string };
}

// Verifies JWT from Authorization: Bearer <token>
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId?: string;
      adminId?: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Must come AFTER authenticate — checks role is "admin" in JWT payload
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ success: false, message: "Admin access required" });
    return;
  }
  next();
};