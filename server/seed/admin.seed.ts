import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Report from "../src/model/report.model";
import AuditLog from "../src/model/auditLog.model";
import Notification from "../src/model/notification.model";

export const clearAdminFeatures = async () => {
  console.log("🗑️ Clearing reports, logs, and notifications...");
  await Report.deleteMany({});
  await AuditLog.deleteMany({});
  await Notification.deleteMany({});
};

export const seedAdminFeatures = async (
  users: any[],
  admin: any,
  websites: any[],
  comments: any[]
) => {
  console.log("🚩 Creating reports...");
  const reportReasons = ["Spam", "Abuse", "Misleading", "Copyright", "Other"];
  const reportSeverities = ["Low", "Medium", "High"];
  const reportStatuses = ["Pending", "Resolved", "Dismissed"];

  for (let i = 0; i < 15; i++) {
    const targetType = faker.helpers.arrayElement([
      "Website",
      "Comment",
      "User",
    ]);
    let targetId, targetName, targetPreview;

    if (targetType === "Website") {
      const site = faker.helpers.arrayElement(websites);
      targetId = site._id;
      targetName = site.name;
      targetPreview = site.description;
    } else if (targetType === "Comment") {
      const comm = faker.helpers.arrayElement(comments);
      targetId = comm._id;
      targetName = `Comment on ${
        websites.find((w) => w._id.equals(comm.website))?.name
      }`;
      targetPreview = comm.content;
    } else {
      const usr = faker.helpers.arrayElement(users);
      targetId = usr._id;
      targetName = usr.fullName;
      targetPreview = usr.bio || "User Profile";
    }

    await Report.create({
      type: targetType,
      targetId,
      targetName,
      targetPreview,
      reporter: faker.helpers.arrayElement(users)._id,
      reason: faker.helpers.arrayElement(reportReasons),
      severity: faker.helpers.arrayElement(reportSeverities),
      status: faker.helpers.arrayElement(reportStatuses),
    });
  }

  console.log("📜 Creating audit logs...");
  const auditActions = [
    "Create",
    "Update",
    "Delete",
    "Approve",
    "Reject",
    "Ban",
    "Suspend",
  ];
  const entityTypes = ["Website", "User", "Comment", "Category", "Report"];

  for (let i = 0; i < 20; i++) {
    await AuditLog.create({
      adminId: admin._id,
      adminName: admin.fullName,
      action: faker.helpers.arrayElement(auditActions),
      entityType: faker.helpers.arrayElement(entityTypes),
      entityId: new mongoose.Types.ObjectId(),
      details: { notes: faker.lorem.sentence() },
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      createdAt: faker.date.recent({ days: 5 }),
    });
  }

  console.log("🔔 Creating notifications for admin...");
  const notifTypes = ["INFO", "SUCCESS", "WARNING", "ERROR"];
  const notifCats = ["System", "Submission", "Report", "User"];

  for (let i = 0; i < 10; i++) {
    await Notification.create({
      recipient: admin._id,
      title: faker.lorem.words(3),
      message: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(notifTypes),
      priority: faker.helpers.arrayElement(["High", "Medium", "Low"]),
      category: faker.helpers.arrayElement(notifCats),
      isRead: faker.datatype.boolean(),
      createdAt: faker.date.recent({ days: 3 }),
    });
  }
};
