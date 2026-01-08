import { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: any = null
) => {
  // console.log(success);
  if (success) {
    console.log(`✅ [SUCCESS] ${statusCode} - ${message}`);
  } else {
    console.log(`⚠️ [WARNING] ${statusCode} - ${message}`);
  }
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error: any = null
) => {
  console.error(
    `❌ [ERROR] ${statusCode} - ${message}`,
    error ? `\nDetails: ${error}` : ""
  );
  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined,
  });
};
