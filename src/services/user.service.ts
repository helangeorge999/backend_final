import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = "7d";

export class UserService {
  private repo = new UserRepository();

  async createUser(data: any) {
    const existing = await this.repo.getUserByEmail(data.email);
    if (existing) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.repo.createUser({
      name: data.name,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      phone: data.phone,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async loginUser(data: { email: string; password: string }) {
    const user = await this.repo.getUserByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    // JWT payload carries `role: "user"` to distinguish from admin tokens
    const token = jwt.sign(
      { userId: user._id.toString(), role: "user" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
  }

  async getUserByEmail(email: string) {
    return this.repo.getUserByEmail(email);
  }

  async getUserProfile(userId: string) {
    const user = await this.repo.getUserById(userId);
    if (!user) throw new Error("User not found");

    const hostUrl = process.env.HOST_URL || "";
    const photoUrl = user.photoUrl
      ? `${hostUrl}${user.photoUrl.replace(hostUrl, "")}`
      : undefined;

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      photoUrl,
      role: "user" as const,
    };
  }

  async uploadPhoto(userId: string, photoUrl: string) {
    return this.repo.updateUserPhoto(userId, photoUrl);
  }

  async updateProfile(userId: string, data: Partial<any>) {
    return this.repo.updateUserProfile(userId, data);
  }
}