import { Request, Response } from "express";
import User from "../model/user.model";
import { sendResponse, sendError } from "../utils/responseHandler";
import jwt, { SignOptions } from "jsonwebtoken";
import { env, logger } from "../config";

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  } as SignOptions);
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return sendError(
        res,
        400,
        "User with this email or username already exists"
      );
    }

    const user = new User({ fullName, username, email, password, role });
    await user.save();

    const userId = user._id.toString();

    const { accessToken, refreshToken } = generateTokens(userId);

    return sendResponse(res, 201, true, "User registered successfully", {
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    logger.error(err);
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      logger.warn("❌ User not found");
      return sendError(res, 401, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn("❌ Invalid password");
      return sendError(res, 401, "Invalid credentials");
    }
    const userId = user._id.toString();
    const { accessToken, refreshToken } = generateTokens(userId);

    return sendResponse(res, 200, true, "Logged in successfully", {
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    logger.error(err);
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // In a cookie-based auth, we would clear the cookie here using res.clearCookie()
    // For now, we mainly rely on client-side token removal, but this endpoint
    // is useful for logging and future-proofing (e.g. invalidating refresh tokens)

    return sendResponse(res, 200, true, "Logged out successfully");
  } catch (err: any) {
    logger.error(err);
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};
