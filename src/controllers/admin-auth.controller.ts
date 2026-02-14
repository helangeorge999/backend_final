import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

const service = new AdminService();

export class AdminAuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const admin = await service.registerAdmin(req.body);
      res.status(201).json({ success: true, message: "Admin created", admin });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, admin } = await service.loginAdmin({ email, password });
      res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user: admin,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}