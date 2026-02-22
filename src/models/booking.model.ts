import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  busId: mongoose.Types.ObjectId;
  seats: number[];
  totalAmount: number;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  bookingDate: Date;
  travelDate: Date;
  status: "confirmed" | "cancelled";
}

const BookingSchema = new Schema({
  userId:         { type: Schema.Types.ObjectId, ref: "User", required: true },
  busId:          { type: Schema.Types.ObjectId, ref: "Bus", required: true },
  seats:          [{ type: Number, required: true }],
  totalAmount:    { type: Number, required: true },
  passengerName:  { type: String, required: true },
  passengerPhone: { type: String, required: true },
  passengerEmail: { type: String, required: true },
  bookingDate:    { type: Date, default: Date.now },
  travelDate:     { type: Date, required: true },
  status:         { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
}, { timestamps: true });

export default mongoose.model<IBooking>("Booking", BookingSchema);