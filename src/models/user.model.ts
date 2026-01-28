import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  dob: Date;
  gender: string;
  phone: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
