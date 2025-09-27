import { Request, Response } from "express";
import * as UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const signup = async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const { username, email, password, avatar } = req.body;

    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const password_hash = await bcrypt.hash(password, 10);
    const result = await UserModel.createUser({ username, email, password_hash, avatar });

    res.status(201).json({ message: "User registered", userId: (result as any).insertId });
  }catch (err) {
    console.error(err); // <-- log the actual error
    res.status(500).json({ error: "Server error", details: err });
}

};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true }).json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

export const profile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.getUserById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ username: user.username, email: user.email, avatar: user.avatar, created_at: user.created_at });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
