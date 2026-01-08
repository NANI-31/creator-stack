import express, { Application } from "express";
import cors from "cors";
import { corsOptions } from "./config";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

// Enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/", routes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  (error as any).statusCode = 404;
  next(error);
});

// Error Handling Middleware
app.use(errorHandler as any);

export default app;
