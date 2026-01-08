import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";
import User, { IUser } from "../model/user.model";
import Role from "../model/role.model";
import { sendError } from "../utils/responseHandler";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, 401, "Not authorized, no token");
    }

    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendError(res, 401, "Token is valid, but user no longer exists");
    }

    // Block banned or suspended users
    if (user.status === "Banned") {
      return sendError(res, 403, "Your account has been banned.");
    }
    if (user.status === "Suspended") {
      return sendError(res, 403, "Your account is currently suspended.");
    }

    req.user = user;
    next();
  } catch (err: any) {
    return sendError(res, 401, "Not authorized, token failed", err.message);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `User role ${req.user?.role} is not authorized to access this route`
      );
    }
    next();
  };
};

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return sendError(res, 401, "Not authorized, user not found");
      }

      // 1. Admin super-override (optional, but good for safety)
      if (req.user.role === "Admin") {
        return next();
      }

      // 2. Fetch Role definition
      // Assuming req.user.role stores the name of the role
      const roleDef = await Role.findOne({ name: req.user.role });

      if (!roleDef) {
        return sendError(
          res,
          403,
          `Role definition for '${req.user.role}' not found found.`
        );
      }

      // 3. Check permission
      if (!roleDef.permissions.includes(requiredPermission)) {
        return sendError(
          res,
          403,
          `You do not have the '${requiredPermission}' permission.`
        );
      }

      next();
    } catch (error: any) {
      return sendError(res, 500, "Permission check failed");
    }
  };
};

export const optionalProtect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);

    if (user && user.status !== "Banned" && user.status !== "Suspended") {
      req.user = user;
    }
    next();
  } catch (err: any) {
    // If token is invalid, just proceed without user
    next();
  }
};
