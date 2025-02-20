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
