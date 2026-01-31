import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      if (!userId) throw new Error("userId is required");

      const data = await service.getUserProfile(userId as string);
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async uploadPhoto(req: Request, res: Response) {
    try {
      const file = req.file;
      const { userId } = req.body;

      if (!file) throw new Error("No file uploaded");
      if (!userId) throw new Error("userId is required");

      const photoUrl = `/uploads/profile/${file.filename}`;
      const hostUrl = process.env.HOST_URL || "http://localhost:3000";
      await service.uploadPhoto(userId, `${hostUrl}${photoUrl}`);

      res.json({ success: true, url: `${hostUrl}${photoUrl}` });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
