import User, { IUser } from "../models/user.model";

export class UserRepository {
  async createUser(data: Partial<IUser>) {
    return User.create(data);
  }

  async getUserByEmail(email: string) {
    return User.findOne({ email });
  }

  async getUserByUsername(username: string) {
    return User.findOne({ username });
  }
}
