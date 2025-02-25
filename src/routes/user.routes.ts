import { Request, Response, Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  udpateUser,
} from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

// Create a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    await createUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

router.get("/login", async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// get all users
router.get("/list-all", auth, async (req: Request, res: Response) => {
  try {
    await getUsers(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// update the user
router.patch("/update-user/:id", auth, async (req: Request, res: Response) => {
  try {
    await udpateUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// Delete the user
router.delete("/delete-user/:id", auth, async (req: Request, res: Response) => {
  try {
    await deleteUser(req, res);
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

export default router;
