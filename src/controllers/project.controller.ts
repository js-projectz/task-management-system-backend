import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new project
 *
 */

const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const userId = (req as any).user.id;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        createdBy: userId,
      },
    });

    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get all the projects
 */

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true },
    });

    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get the single project by id
 *
 */

const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { tasks: true },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });
    return res.json(project);
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// update product by id
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedProject = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: { name, description, updatedAt: new Date() },
    });

    return res
      .status(200)
      .json({ message: "update project sucessful", updatedProject });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error updating project", error: err.message });
  }
};

// Delete the product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Product is deleted" });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "error occured", error: err.message });
  }
};

export {
  createProject,
  updateProduct,
  deleteProduct,
  getAllProjects,
  getProjectById,
};
