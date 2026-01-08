import { Router } from "express";
import {
  createWebsite,
  getAllWebsites,
  getTrending,
  getWebsiteById,
} from "../controller/website.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllWebsites);
router.get("/trending", getTrending);
router.get("/:id", getWebsiteById);
router.post("/", protect, createWebsite);

export default router;
