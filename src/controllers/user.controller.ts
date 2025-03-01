import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// Create a new user
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true },
    });

    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { tasks: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, email, password: hashedPassword },
    });

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
