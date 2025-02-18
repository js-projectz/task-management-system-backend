import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, passwordHash, role } = req.body;

  if (!username || !email || !passwordHash || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.user.create({
      data: { username, email, passwordHash, role },
    });

    console.log("create-user", user);

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

// Update the user
const udpateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, passwordHash, role } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, email, passwordHash, role },
    });

    console.log("user---update", user);

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { activityLogs: true, notifications: true, tasks: true },
    });

    return res.status(200).json({ message: "get user sucessfully", user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete the user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ message: "User deleted sucessfully" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export { createUser, deleteUser, getUserById, udpateUser, getUsers };
