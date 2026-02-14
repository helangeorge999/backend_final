import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorizeUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const requestedId = (
    req.params.id ||
    req.query.userId ||
    req.body.userId
  ) as string;

  if (!requestedId) {
    res.status(400).json({ success: false, message: "userId is required" });
    return;
  }

  if (req.user?.role === "admin") {
    next();
    return;
  }

  if (req.user?.userId !== requestedId) {
    res.status(403).json({ success: false, message: "Access denied" });
    return;
  }

  next();
};