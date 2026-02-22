import mongoose, { Schema, Document } from "mongoose";

export interface IBus extends Document {
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  type: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const BusSchema = new Schema(
  {
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, default: 40 },
    type: { type: String, required: true },
    rating: { type: Number, default: 4.0, min: 0, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model<IBus>("Bus", BusSchema);