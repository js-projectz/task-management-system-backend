// here the all code is related to task controller
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { projectId, title, description, status, priority, dueDate } =
      req.body;

    const createdBy = (req as any).user; // extract the user id from req

    const task = await prisma.task.create({
      data: {
        projectId,
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        createdBy,
      },
      include: {
        user: true,
        project: true,
      },
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all task by project ID

const getAllTaskByProjectId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { projectId } = req.body;

    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId) },
      include: { user: true, project: true },
    });
    return res.status(200).json({ tasks });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// get the single task
const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { user: true, project: true },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ task });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// update the Task
const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: { user: true, project: true },
    });

    return res
      .status(200)
      .json({ message: "Task updated successfully", updatedTask });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// delete the task

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createTask,
  getAllTaskByProjectId,
  updateTask,
  deleteTask,
  getTaskById,
};
