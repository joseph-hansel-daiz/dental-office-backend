import { Request, Response } from "express";
import Appointment from "../models/appointment";
import Slot from "../models/slot";
import User from "../models/user";
import Service from "../models/service";
import { AuthRequest } from "../middleware/auth";
import { Dentist, Schedule, SlotOption } from "../models";

export const listAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id;

    const where: any = {};
    if (role !== "admin") {
      where.userId = userId;
    }

    const appointments = await Appointment.findAll({
      where,
      include: [
        {
          model: Slot,
          as: "slot",
          include: [
            { model: SlotOption, as: "slotOption" },
            {
              model: Schedule,
              as: "schedule",
              include: [
                {
                  model: Dentist,
                  as: "dentist",
                  include: [{ model: Service, as: "services" }],
                },
              ],
            },
          ],
        },
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: Service, as: "service" },
      ],
      order: [["id", "ASC"]],
    });

    return res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving appointments", error });
  }
};

export const createAppointment = async (req: AuthRequest, res: Response) => {
  const { userId: bodyUserId, slotId, serviceId, notes } = req.body;

  try {
    const userId = req.user?.role === "admin" ? bodyUserId : req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const slot = await Slot.findByPk(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const appointment = await Appointment.create({
      userId,
      slotId,
      serviceId,
      notes,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating appointment", error });
  }
};

export const getAppointmentDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: Slot, as: "slot" },
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { model: Service, as: "service" },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.json(appointment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving appointment", error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, slotId, serviceId, notes } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (userId !== undefined) appointment.userId = userId;
    if (slotId !== undefined) appointment.slotId = slotId;
    if (serviceId !== undefined) appointment.serviceId = serviceId;
    if (notes !== undefined) appointment.notes = notes;

    await appointment.save();
    return res.json(appointment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating appointment", error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.destroy();
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting appointment", error });
  }
};
