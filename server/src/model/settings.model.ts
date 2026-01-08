import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  platformName: string;
  platformDescription: string;
  defaultLanguage: string;
  timeZone: string;
  maintenanceMode: boolean;
  autoApproveSubmissions: boolean;
  maxSubmissionsPerUserPerDay: number;
  duplicateUrlDetection: boolean;
  reportThreshold: number;
  commentModerationLevel: "None" | "Filter" | "Hold";
  requireAdminApprovalForNewUsers: boolean;
  enforce2FA: boolean;
}

const settingsSchema = new Schema<ISettings>(
  {
    platformName: { type: String, default: "CreatorStack" },
    platformDescription: {
      type: String,
      default: "Curated tools for creators",
    },
    defaultLanguage: { type: String, default: "English" },
    timeZone: { type: String, default: "UTC" },
    maintenanceMode: { type: Boolean, default: false },
    autoApproveSubmissions: { type: Boolean, default: false },
    maxSubmissionsPerUserPerDay: { type: Number, default: 5 },
    duplicateUrlDetection: { type: Boolean, default: true },
    reportThreshold: { type: Number, default: 5 },
    commentModerationLevel: {
      type: String,
      enum: ["None", "Filter", "Hold"],
      default: "Filter",
    },
    requireAdminApprovalForNewUsers: { type: Boolean, default: false },
    enforce2FA: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Settings = mongoose.model<ISettings>("Settings", settingsSchema);
export default Settings;
