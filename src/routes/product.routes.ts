import { Request, Response, Router } from "express";
import {
  createProject,
  deleteProduct,
  getAllProjects,
  updateProduct,
  getProjectById,
} from "../controllers/project.controller";

const router = Router();

router.post("/create-project", async (req: Request, res: Response) => {
  try {
    await createProject(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// get all products
router.get("/list-all-products", async (req: Request, res: Response) => {
  try {
    await getAllProjects(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// update the product
router.patch("/update-product/:id", async (req: Request, res: Response) => {
  try {
    await updateProduct(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// Get product by id
router.get("/task/:id", async (req: Request, res: Response) => {
  try {
    await getProjectById(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

// Delete the product
router.delete("/delete-product/:id", async (req: Request, res: Response) => {
  try {
    await deleteProduct(req, res);
    return;
  } catch (err: any) {
    res.status(res.statusCode).json({ Message: err.message });
    return;
  }
});

export default router;
