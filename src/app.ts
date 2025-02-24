import userRoutes from "./routes/user.routes";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import middleWare from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const URL = process.env.NGROK_URL || `http://localhost:${PORT}`;
app.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send(`Public URL: ${URL}`);
});

app.use("/api/users", userRoutes);

app.use(middleWare);
// After the login the user will be auth

app.listen(PORT, () => {
  console.log(`Server is running on port ${URL}`);
});
