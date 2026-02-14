import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HOST_URL } from "../config/env";

const service = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ success: false, message: "userId is required" });
        return;
      }
      const data = await service.getUserProfile(userId);
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async uploadPhoto(req: Request, res: Response): Promise<void> {
    try {
      const file       = req.file;
      const { userId } = req.body;

      if (!file)   { res.status(400).json({ success: false, message: "No file uploaded" }); return; }
      if (!userId) { res.status(400).json({ success: false, message: "userId is required" }); return; }

      const photoPath = `/uploads/profile/${file.filename}`;
      await service.uploadPhoto(userId, `${HOST_URL}${photoPath}`);
      res.json({ success: true, url: `${HOST_URL}${photoPath}` });
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
      const updated = await service.updateProfile(userId, req.body);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}