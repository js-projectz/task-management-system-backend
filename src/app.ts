
import userRoutes from "./routes/user.routes";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import middleWare from "./middlewares/auth.middleware";

dotenv.config();

const app = express();


import app from "./routes/user.routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const PORT = process.env.PORT || 8080;
app.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(middleWare);
// After the login the user will be auth

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

