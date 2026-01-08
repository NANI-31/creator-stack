import { Router } from "express";
import authRoutes from "./auth.routes";
import websiteRoutes from "./website.routes";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes";
import notificationRoutes from "./notification.routes";
import adminRoutes from "./admin.routes";
import auditLogRoutes from "./auditLog.routes";
import roleRoutes from "./role.routes";
import commentRoutes from "./comment.routes";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/websites", websiteRoutes);
router.use("/api/users", userRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/notifications", notificationRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/admin/audit-logs", auditLogRoutes);
router.use("/api/admin/roles", roleRoutes);
router.use("/api/comments", commentRoutes);

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

export default router;
