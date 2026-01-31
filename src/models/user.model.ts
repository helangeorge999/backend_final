import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  dob: Date;
  gender: string;
  phone: string;
  password: string;
  photoUrl?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  photoUrl: { type: String },
});

export default mongoose.model<IUser>("User", userSchema);
