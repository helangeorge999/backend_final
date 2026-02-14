import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class AuthController {
  private service = new UserService();

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.service.createUser(req.body);
      res.status(201).json({ success: true, message: "Signup successful", user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.service.loginUser({ email, password });
      const fullUser = await this.service.getUserProfile(user._id.toString());
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: fullUser,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}