import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
const createUser = async (req: Request, res: Response) => {
  const { username, email, passwordHash, role } = req.body;

  if (!username || !email || !passwordHash || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.user.create({
      data: { username, email, passwordHash, role },
    });

    return res.status(201).json({ message: "User created sucessfuly", user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true, activityLogs: true, notifications: true },
    });

    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
