import bcrypt from "bcryptjs";
import User from "../models/user.model";

export class UserService {

  async createUser(data: any) {
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) {
      throw new Error("Email already registered");
    }

    // 🔹 Generate username automatically
    const baseUsername = data.email.split("@")[0];
    let username = baseUsername;
    let counter = 1;

    while (await User.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      username,
      password: hashedPassword,
    });

    return {
      id: user._id,
      email: user.email,
      username: user.username,
    };
  }

  async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return {
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  }
}
