import express from "express";
import morgan from "morgan";
import cors from "cors";

import "./config/db";
import routes from "./routes";

const app = express();

const corsOptions = {
  origin: "https://gcu-mobile.surge.sh",
  optionsSuccessStatus: 200,
};

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use("/api", routes);

export default app;
