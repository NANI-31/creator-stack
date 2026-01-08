import { Router } from "express";
import {
  getDashboardStats,
  getMyContributions,
} from "../controller/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/dashboard", protect, getDashboardStats);
router.get("/my-contributions", protect, getMyContributions);

export default router;
