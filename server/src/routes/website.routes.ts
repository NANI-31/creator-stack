import { Router } from "express";
import {
  createWebsite,
  getAllWebsites,
  getTrending,
  getWebsiteById,
  voteWebsite,
} from "../controller/website.controller";
import { protect, optionalProtect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", optionalProtect, getAllWebsites);
router.get("/trending", optionalProtect, getTrending);
router.get("/:id", optionalProtect, getWebsiteById);
router.post("/:id/vote", protect, voteWebsite);
router.post("/", protect, createWebsite);

export default router;
