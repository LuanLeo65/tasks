//app.ts
import express from "express";
import router from "./routes/task";
import cors from "cors";
import dotenv from "dotenv";
import errorsMiddleware from "commons/models/errors/errorsMiddleware";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.use(express.json());
app.use(router);

app.use(errorsMiddleware);
export default app;
