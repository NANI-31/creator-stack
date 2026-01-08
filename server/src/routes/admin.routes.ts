import { Router } from "express";
import {
  getAllSubmissions,
  updateSubmissionStatus,
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
  getAllReports,
  updateReportStatus,
  getAdminAnalytics,
  getAdminSettings,
  updateAdminSettings,
} from "../controller/admin.controller";
import {
  getAdminNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearReadNotifications,
} from "../controller/adminNotification.controller";
import { protect, authorize } from "../middlewares/auth.middleware";

const router = Router();

// Protect all routes to Admin/Moderator only
router.use(protect);
router.use(authorize("Admin", "Moderator"));

// Submissions
router.get("/submissions", getAllSubmissions);
router.patch("/submissions/:id/status", updateSubmissionStatus);

// Users
router.get("/users", getAdminUsers);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/status", updateUserStatus);

// Reports
router.get("/reports", getAllReports);
router.patch("/reports/:id/status", updateReportStatus);

// Analytics
router.get("/analytics", getAdminAnalytics);

// Settings
router.get("/settings", getAdminSettings);
router.patch("/settings", updateAdminSettings);

// Notifications
router.get("/notifications", getAdminNotifications);
router.patch("/notifications/read-all", markAllNotificationsAsRead);
router.patch("/notifications/:id/read", markNotificationAsRead);
router.delete("/notifications/clear-read", clearReadNotifications);
router.delete("/notifications/:id", deleteNotification);

export default router;
