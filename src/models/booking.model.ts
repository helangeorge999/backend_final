import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  busId: mongoose.Types.ObjectId;
  bookingId: string;
  from: string;
  to: string;
  travelDate: string;
  seats: string;
  totalAmount: number;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  status: "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    bookingId: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    travelDate: { type: String, required: true },
    seats: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    passengerName: { type: String, required: true },
    passengerPhone: { type: String, required: true },
    passengerEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);