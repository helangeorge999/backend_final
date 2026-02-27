import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HOST_URL } from "../config/env";

export class UserController {
  private service = new UserService();

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ success: false, message: "userId is required" });
        return;
      }
      const data = await this.service.getUserProfile(userId);
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async uploadPhoto(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      const { userId } = req.body;

      if (!file) {
        res.status(400).json({ success: false, message: "No file uploaded" });
        return;
      }
      if (!userId) {
        res.status(400).json({ success: false, message: "userId is required" });
        return;
      }

      // Store ONLY the relative path in DB
      const photoPath = `/uploads/profile/${file.filename}`;
      await this.service.uploadPhoto(userId, photoPath);

      // Return full URL in response
      res.json({ success: true, url: `${HOST_URL}${photoPath}` });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        res.status(400).json({ success: false, message: "Both current and new passwords are required" });
        return;
      }

      const result = await this.service.changePassword(userId, currentPassword, newPassword);
      res.json({ success: true, message: result.message });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ success: false, message: "userId is required" });
        return;
      }
      const updated = await this.service.updateProfile(userId, req.body);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}