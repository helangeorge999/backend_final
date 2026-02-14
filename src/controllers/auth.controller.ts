import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await service.createUser(req.body);
      res.status(201).json({ success: true, message: "Signup successful", user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Now returns { user, token }
      const { user, token } = await service.loginUser({ email, password });
      const fullUser = await service.getUserProfile(user._id.toString());

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,          // ← JWT token the frontend needs
        user: fullUser, // includes role
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}