import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { JWT_SECRET, HOST_URL } from "../config/env";

const JWT_EXPIRES_IN = "7d";

export class UserService {
  private repo = new UserRepository();

  async createUser(data: {
    name: string;
    email: string;
    dob: string;
    gender: string;
    phone: string;
    password: string;
  }) {
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

    return { id: user._id, name: user.name, email: user.email };
  }

  async loginUser(data: { email: string; password: string }) {
    const user = await this.repo.getUserByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { userId: user._id.toString(), role: "user" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
  }

  async getUserProfile(userId: string) {
    const user = await this.repo.getUserById(userId);
    if (!user) throw new Error("User not found");

    // Handle both old (full URL) and new (relative path) formats in DB
    let photoUrl: string | undefined;
    if (user.photoUrl && user.photoUrl.trim() !== '') {
      if (user.photoUrl.startsWith('http')) {
        // Already a full URL — extract relative path first
        const relativePath = user.photoUrl.replace(HOST_URL, '');
        photoUrl = `${HOST_URL}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
      } else {
        // Relative path — just prepend HOST_URL
        photoUrl = `${HOST_URL}${user.photoUrl}`;
      }
    }

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

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.repo.getUserById(userId);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Current password is incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return { message: "Password changed successfully" };
  }

  async updateProfile(
    userId: string,
    data: Partial<{ name: string; phone: string; gender: string; dob: string }>
  ) {
    return this.repo.updateUserProfile(userId, data);
  }
}