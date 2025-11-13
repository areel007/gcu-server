import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import "./config/db";
import routes from "./routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://gcu-mobile.surge.sh"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // IMPORTANT

// middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

export default app;
