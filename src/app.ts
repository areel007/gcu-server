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
  origin: [
    "http://localhost:3000", // ✅ dev
    "https://gcu-mobile.surge.sh", // ✅ deployed frontend
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization",
};

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use("/api", routes);

export default app;
