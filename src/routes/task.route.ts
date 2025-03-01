import { Router, Request, Response } from "express";
import {
  createTask,
  getAllTaskByProjectId,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
const router = Router();

// Create Task
router.post("/create-task", async (req: Request, res: Response) => {
  try {
    await createTask(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// get all tasks
router.get("/list-all-tasks", async (req: Request, res: Response) => {
  try {
    await getAllTaskByProjectId(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// get the task by id
router.get("/task/:id", async (req: Request, res: Response) => {
  try {
    await getTaskById(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// update  the task
router.patch("/update-task/:id", async (req: Request, res: Response) => {
  try {
    await updateTask(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

router.delete("/delete-task/:id", async (req: Request, res: Response) => {
  try {
    await deleteTask(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

export default router;
