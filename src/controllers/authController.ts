import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const register = async (req: Request, res: Response) => {
  const { email, password, name, address, mobileNumber } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "email, password, and name are required" });
  }

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    // All registered users are clients by default
    const user = await User.create({
      email,
      password,
      name,
      mobileNumber,
      address,
      role: "client",
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "supersecretkey"
    );
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await user.validPassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "supersecretkey"
    );
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
