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

      const user = await service.loginUser({ email, password });
      const fullUser = await service.getUserByEmail(email);

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: fullUser?._id,
          name: fullUser?.name,
          email: fullUser?.email,
          phone: fullUser?.phone,
          gender: fullUser?.gender,
          dob: fullUser?.dob,
          photoUrl: fullUser?.photoUrl,
        },
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
