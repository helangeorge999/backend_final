import User, { IUser } from "../models/user.model";

export class UserRepository {
  async createUser(data: Partial<IUser>) {
    return User.create(data);
  }

  async getUserByEmail(email: string) {
    return User.findOne({ email });
  }

  async getUserById(id: string) {
    return User.findById(id);
  }

  async updateUserPhoto(id: string, photoUrl: string) {
    return User.findByIdAndUpdate(id, { photoUrl }, { new: true });
  }

  async getUserByUsername(username: string) {
    return User.findOne({ username }); // optional if you want username logic
  }
}
