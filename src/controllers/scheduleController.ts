import { Request, Response } from "express";
import { Op } from "sequelize";
import Schedule from "../models/schedule";
import Dentist from "../models/dentist";
import Slot from "../models/slot";
import SlotOption from "../models/slotOption";
import Appointment from "../models/appointment";

export const listSchedules = async (req: Request, res: Response) => {
  try {
    const { dentistId, month, year, includeSlots } = req.query;

    const where: any = {};
    if (dentistId) where.dentistId = dentistId;

    if (year && !month) {
      const y = parseInt(year as string, 10);
      const start = new Date(Date.UTC(y, 0, 1)).toISOString().slice(0, 10);
      const end = new Date(Date.UTC(y, 11, 31)).toISOString().slice(0, 10);
      where.date = { [Op.between]: [start, end] };
    } else if (year && month) {
      const y = parseInt(year as string, 10);
      const m = parseInt(month as string, 10);
      const startDate = new Date(Date.UTC(y, m - 1, 1));
      const endDate = new Date(Date.UTC(y, m, 0));
      const start = startDate.toISOString().slice(0, 10);
      const end = endDate.toISOString().slice(0, 10);
      where.date = { [Op.between]: [start, end] };
    }

    const include: any[] = [{ model: Dentist, as: "dentist" }];

    if (includeSlots === "true") {
      include.push({
        model: Slot,
        as: "slots",
        include: [
          { model: SlotOption, as: "slotOption" },
          { model: Appointment, as: "appointment" },
        ],
      });
    }

    const schedules = await Schedule.findAll({
      where,
      include,
      order: [["date", "ASC"]],
    });

    return res.json(schedules);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving schedules", error });
  }
};
