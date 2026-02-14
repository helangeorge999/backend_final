import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  private service = new AdminService();

  async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.getAllUsers();
      res.json({ success: true, data: users });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.service.updateUser(req.params.id, req.body);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.service.deleteUser(req.params.id);
      res.json({ success: true, message: "User deleted" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}