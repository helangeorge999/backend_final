import { Request, Response } from "express";
import Bus from "../models/bus.model";
import { HttpError } from "../utils/HttpError";

export class BusController {
  // Get all buses
  async getAll(req: Request, res: Response) {
    try {
      const buses = await Bus.find().sort({ createdAt: -1 });
      res.json({ success: true, data: buses });
    } catch (error) {
      throw new HttpError(500, "Failed to fetch buses");
    }
  }

  // Get bus by ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bus = await Bus.findById(id);
      if (!bus) throw new HttpError(404, "Bus not found");
      res.json({ success: true, data: bus });
    } catch (error: any) {
      throw new HttpError(error.statusCode || 500, error.message);
    }
  }

  // Create bus (Admin only)
  async create(req: Request, res: Response) {
    try {
      const bus = await Bus.create(req.body);
      res.status(201).json({ success: true, data: bus });
    } catch (error) {
      throw new HttpError(400, "Failed to create bus");
    }
  }

  // Update bus (Admin only)
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
      if (!bus) throw new HttpError(404, "Bus not found");
      res.json({ success: true, data: bus });
    } catch (error: any) {
      throw new HttpError(error.statusCode || 500, error.message);
    }
  }

  // Delete bus (Admin only)
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndDelete(id);
      if (!bus) throw new HttpError(404, "Bus not found");
      res.json({ success: true, message: "Bus deleted" });
    } catch (error: any) {
      throw new HttpError(error.statusCode || 500, error.message);
    }
  }

  // Search buses by route and date
  async search(req: Request, res: Response) {
    try {
      const { from, to, date } = req.query;
      
      const query: any = {};
      if (from) query.from = from;
      if (to) query.to = to;

      const buses = await Bus.find(query);
      res.json({ success: true, data: buses });
    } catch (error) {
      throw new HttpError(500, "Failed to search buses");
    }
  }
}