import dotenv from "dotenv";
dotenv.config();

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required env variable: ${key}`);
  }
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,

  // Database
  MONGO_URI: requiredEnv("MONGO_URI"),

  // JWT
  JWT_ACCESS_SECRET: requiredEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: requiredEnv("JWT_REFRESH_SECRET"),
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // Cloud storage
  // CLOUDINARY_CLOUD_NAME: requiredEnv("CLOUDINARY_CLOUD_NAME"),
  // CLOUDINARY_API_KEY: requiredEnv("CLOUDINARY_API_KEY"),
  // CLOUDINARY_API_SECRET: requiredEnv("CLOUDINARY_API_SECRET"),

  // Google OAuth
  // GOOGLE_CLIENT_ID: requiredEnv("GOOGLE_CLIENT_ID"),
  // GOOGLE_CLIENT_SECRET: requiredEnv("GOOGLE_CLIENT_SECRET"),
  // GOOGLE_REFRESH_TOKEN: requiredEnv("GOOGLE_REFRESH_TOKEN"),
  // GOOGLE_REDIRECT_URI: requiredEnv("GOOGLE_REDIRECT_URI"),
};
