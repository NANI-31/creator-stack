import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  priority: "High" | "Medium" | "Low";
  category: "System" | "Submission" | "Report" | "User";
  isRead: boolean;
  link?: string;
  relatedId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["INFO", "SUCCESS", "WARNING", "ERROR"],
      default: "INFO",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: ["System", "Submission", "Report", "User"],
      default: "System",
    },
    isRead: { type: Boolean, default: false },
    link: { type: String },
    relatedId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

// Index for performance when fetching notifications for a user
notificationSchema.index({ recipient: 1, createdAt: -1 });

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
