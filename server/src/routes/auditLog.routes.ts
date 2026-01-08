import express from "express";
import { getAuditLogs } from "../controller/auditLog.controller";
import { protect, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.use(authorize("Admin", "Moderator"));

router.get("/", getAuditLogs);

export default router;
