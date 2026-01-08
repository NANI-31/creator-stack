import express from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controller/role.controller";
import { protect, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.use(authorize("Admin"));

router.route("/").get(getRoles).post(createRole);
router.route("/:id").get(getRoleById).put(updateRole).delete(deleteRole);

export default router;
