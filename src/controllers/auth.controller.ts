import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: "User created",
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await userService.loginUser(req.body);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
