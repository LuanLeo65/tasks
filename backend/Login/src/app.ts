import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorsMiddleware from "commons/models/errors/errorsMiddleware"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
  }));

app.use(routes);

app.use(errorsMiddleware);

export default app;
