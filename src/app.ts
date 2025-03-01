import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import taskRoutes from "./routes/task.route";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import middleWare from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.NGROK_URL || `http://localhost:${PORT}`;
app.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);

app.use(express.json());

app.use("/api/users", userRoutes);

// After the login the user will be auth
app.use(middleWare);
app.use("/api/products", productRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${URL}`);
});
