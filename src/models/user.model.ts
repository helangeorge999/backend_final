import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  dob?: string;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name:     { type: String },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:    { type: String },
    gender:   { type: String },
    dob:      { type: String },
    photoUrl: { type: String },
  },
  { timestamps: true, collection: "users" }
);

export default mongoose.model<IUser>("User", UserSchema);