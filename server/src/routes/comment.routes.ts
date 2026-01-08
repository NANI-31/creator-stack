import { Router } from "express";
import {
  createComment,
  getWebsiteComments,
  deleteComment,
  voteComment,
} from "../controller/comment.controller";
import { protect, optionalProtect } from "../middlewares/auth.middleware";

const router = Router();

// Public / Optionally Authenticated routes
router.get("/website/:websiteId", optionalProtect, getWebsiteComments);

// Protected routes
router.post("/", protect, createComment);
router.post("/:id/vote", protect, voteComment);
router.delete("/:id", protect, deleteComment);

export default router;
