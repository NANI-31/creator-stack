import { CorsOptions } from "cors";
import { env } from "./env";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server & tools like Postman
    if (!origin) return callback(null, true);

    // Load allowed origins from environment variable, fallback for dev
    const allowedOrigins = (
      process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:5173"
    ).split(",");

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      if (env.NODE_ENV === "development") {
        // Be more permissive in development
        console.warn(`⚠️ CORS: Allowing unlisted origin in dev: ${origin}`);
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    }
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
