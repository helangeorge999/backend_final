import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  photoUrl?: string;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoUrl: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
