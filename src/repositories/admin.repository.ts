import Admin, { IAdmin } from "../models/admin.model";
import User from "../models/user.model";

export class AdminRepository {
  async createAdmin(data: Partial<IAdmin>) {
    return Admin.create(data);
  }

  async getAdminByEmail(email: string) {
    return Admin.findOne({ email });
  }

  async getAdminById(id: string) {
    return Admin.findById(id);
  }

  async getAllAdmins() {
    return Admin.find({}, { password: 0 });
  }

  async updateAdmin(id: string, data: Partial<IAdmin>) {
    return Admin.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteAdmin(id: string) {
    return Admin.findByIdAndDelete(id);
  }

  async getAllUsers() {
    return User.find({}, { password: 0 });
  }

  async getUserById(id: string) {
    return User.findById(id);
  }

  async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  }

  async updateUser(id: string, data: object) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
}