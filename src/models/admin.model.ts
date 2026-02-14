import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminSchema: Schema = new Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoUrl: { type: String },
  },
  { timestamps: true, collection: "admins" }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);