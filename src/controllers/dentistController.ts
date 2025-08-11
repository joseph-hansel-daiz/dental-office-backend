import { Request, Response } from "express";
import Dentist from "../models/dentist";
import Service from "../models/service";

export const listDentists = async (req: Request, res: Response) => {
  try {
    const { includeServices } = req.query;

    const dentists = await Dentist.findAll({
      include:
        includeServices === "true" ? [{ model: Service, as: "services" }] : [],
    });

    return res.json(dentists);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving dentists", error });
  }
};
