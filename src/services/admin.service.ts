import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminRepository } from "../repositories/admin.repository";
import { JWT_SECRET } from "../config/env";

const JWT_EXPIRES_IN = "7d";

export class AdminService {
  private repo = new AdminRepository();

  async registerAdmin(data: { name: string; email: string; password: string }) {
    const existing = await this.repo.getAdminByEmail(data.email);
    if (existing) throw new Error("Admin email already registered");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const admin = await this.repo.createAdmin({
      name:     data.name,
      email:    data.email,
      password: hashedPassword,
    });

    return { id: admin._id, name: admin.name, email: admin.email };
  }

  async loginAdmin(data: { email: string; password: string }) {
    const admin = await this.repo.getAdminByEmail(data.email);
    if (!admin) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(data.password, admin.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { adminId: admin._id.toString(), role: "admin" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: "admin" as const },
    };
  }

  async getAdminProfile(adminId: string) {
    const admin = await this.repo.getAdminById(adminId);
    if (!admin) throw new Error("Admin not found");
    return { id: admin._id, name: admin.name, email: admin.email, photoUrl: admin.photoUrl, role: "admin" as const };
  }

  async getAllUsers() {
    return this.repo.getAllUsers();
  }

  async deleteUser(userId: string) {
    const user = await this.repo.getUserById(userId);
    if (!user) throw new Error("User not found");
    return this.repo.deleteUser(userId);
  }

  async updateUser(userId: string, data: object) {
    const user = await this.repo.getUserById(userId);
    if (!user) throw new Error("User not found");
    return this.repo.updateUser(userId, data);
  }
}