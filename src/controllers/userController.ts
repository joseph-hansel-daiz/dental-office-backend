import { Request, Response } from "express";
import User from "../models/user";

export const list = async (_req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
};

export const detail = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

export const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { mobileNumber, address, name } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.set({
      name: name ?? user.name,
      mobileNumber: mobileNumber ?? user.mobileNumber,
      address: address ?? user.address,
    });
    await user.save();

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
