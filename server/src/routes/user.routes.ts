import { Router } from "express";
import {
  getDashboardStats,
  getMyContributions,
  toggleSavedWebsite,
  getSavedWebsites,
} from "../controller/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/dashboard", protect, getDashboardStats);
router.get("/my-contributions", protect, getMyContributions);
router.post("/saved/:websiteId", protect, toggleSavedWebsite);
router.get("/saved", protect, getSavedWebsites);

export default router;
