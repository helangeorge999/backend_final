import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

const service = new AdminService();

export class AdminController {
  // GET /api/admin/users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await service.getAllUsers();
      res.json({ success: true, data: users });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // PATCH /api/admin/users/:id
  async updateUser(req: Request, res: Response) {
    try {
      const updated = await service.updateUser(req.params.id, req.body);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // DELETE /api/admin/users/:id
  async deleteUser(req: Request, res: Response) {
    try {
      await service.deleteUser(req.params.id);
      res.json({ success: true, message: "User deleted" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}