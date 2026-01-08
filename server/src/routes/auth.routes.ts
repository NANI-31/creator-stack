import { Router } from "express";
import { register, login, logout } from "../controller/auth.controller";
import { authLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

// Apply strict rate limiting to auth endpoints
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
