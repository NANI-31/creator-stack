import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller";
import { protect, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllCategories);
router.post("/", protect, authorize("Admin", "Moderator"), createCategory);
router.patch("/:id", protect, authorize("Admin", "Moderator"), updateCategory);
router.delete("/:id", protect, authorize("Admin", "Moderator"), deleteCategory);

export default router;
