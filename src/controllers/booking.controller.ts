import { Request, Response } from "express";
import Booking from "../models/booking.model";
import Bus from "../models/bus.model";

export class BookingController {
  // Create booking
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const { busId, from, to, travelDate, seats, totalAmount, passengerName, passengerPhone, passengerEmail } = req.body;

      if (!busId) {
        res.status(400).json({ success: false, message: "busId is required" });
        return;
      }

      // Verify bus exists
      const bus = await Bus.findById(busId);
      if (!bus) {
        res.status(404).json({ success: false, message: "Bus not found" });
        return;
      }

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
      res.status(400).json({ success: false, message: error.message || "Failed to create booking" });
    }
  }

  // Get user's bookings
  async getUserBookings(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const bookings = await Booking.find({ userId })
        .populate("busId")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: bookings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch bookings" });
    }
  }

  // Get all bookings (Admin only)
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await Booking.find()
        .populate("userId", "name email")
        .populate("busId")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: bookings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch bookings" });
    }
  }

  // Cancel booking
  async cancel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      const booking = await Booking.findById(id);
      if (!booking) {
        res.status(404).json({ success: false, message: "Booking not found" });
        return;
      }

      if (booking.userId.toString() !== userId) {
        res.status(403).json({ success: false, message: "Not authorized" });
        return;
      }

      booking.status = "cancelled";
      await booking.save();

      res.json({ success: true, data: booking });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to cancel booking" });
    }
  }
}