import { Request, Response } from "express";
import Booking from "../models/booking.model";
import Bus from "../models/bus.model";
import { HttpError } from "../utils/HttpError";

export class BookingController {
  // Create booking
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new HttpError(401, "Unauthorized");

      const { busId, from, to, travelDate, seats, totalAmount, passengerName, passengerPhone, passengerEmail } = req.body;

      // Verify bus exists
      const bus = await Bus.findById(busId);
      if (!bus) throw new HttpError(404, "Bus not found");

      // Generate booking ID
      const bookingId = `BK${Date.now()}`;

      const booking = await Booking.create({
        userId,
        busId,
        bookingId,
        from,
        to,
        travelDate,
        seats,
        totalAmount,
        passengerName,
        passengerPhone,
        passengerEmail,
      });

      res.status(201).json({ success: true, data: booking });
    } catch (error: any) {
      throw new HttpError(error.statusCode || 400, error.message || "Failed to create booking");
    }
  }

  // Get user's bookings
  async getUserBookings(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new HttpError(401, "Unauthorized");

      const bookings = await Booking.find({ userId })
        .populate("busId")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: bookings });
    } catch (error) {
      throw new HttpError(500, "Failed to fetch bookings");
    }
  }

  // Get all bookings (Admin only)
  async getAll(req: Request, res: Response) {
    try {
      const bookings = await Booking.find()
        .populate("userId", "name email")
        .populate("busId")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: bookings });
    } catch (error) {
      throw new HttpError(500, "Failed to fetch bookings");
    }
  }

  // Cancel booking
  async cancel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const booking = await Booking.findById(id);
      if (!booking) throw new HttpError(404, "Booking not found");

      // Check if user owns this booking
      if (booking.userId.toString() !== userId) {
        throw new HttpError(403, "Not authorized");
      }

      booking.status = "cancelled";
      await booking.save();

      res.json({ success: true, data: booking });
    } catch (error: any) {
      throw new HttpError(error.statusCode || 500, error.message);
    }
  }
}