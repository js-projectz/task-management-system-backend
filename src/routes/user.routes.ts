import { Request, Response, Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  udpateUser,
} from "../controllers/user.controller";

const router = Router();

// Create a new user
router.post("/create-user", async (req: Request, res: Response) => {
  try {
    await createUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    await getUserById(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// get all users
router.get("/list-all", async (req: Request, res: Response) => {
  try {
    await getUsers(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// update the user
router.patch("/update-user/:id", async (req: Request, res: Response) => {
  try {
    await udpateUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// Delete the user
router.delete("/delete-user/:id", async (req: Request, res: Response) => {
  try {
    await deleteUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});
