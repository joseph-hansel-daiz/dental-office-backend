import { Request, Response } from "express";
import Service from "../models/service";

export const listServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    return res.json(services);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving services", error });
  }
};
