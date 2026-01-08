import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminName: string;
  action:
    | "Create"
    | "Update"
    | "Delete"
    | "Approve"
    | "Reject"
    | "Ban"
    | "Suspend"
    | "Other";
  entityType:
    | "Website"
    | "User"
    | "Comment"
    | "Category"
    | "Report"
    | "Settings"
    | "Other";
  entityId: mongoose.Types.ObjectId;
  details?: {
    before?: any;
    after?: any;
    notes?: string;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const auditLogSchema: Schema = new Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: [
        "Create",
        "Update",
        "Delete",
        "Approve",
        "Reject",
        "Ban",
        "Suspend",
        "Other",
      ],
      required: true,
    },
    entityType: {
      type: String,
      enum: [
        "Website",
        "User",
        "Comment",
        "Category",
        "Report",
        "Settings",
        "Other",
      ],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    details: {
      before: { type: mongoose.Schema.Types.Mixed },
      after: { type: mongoose.Schema.Types.Mixed },
      notes: { type: String },
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Logs are immutable, so no updatedAt
  }
);

// Indexes for faster filtering
auditLogSchema.index({ adminId: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ entityType: 1 });
auditLogSchema.index({ createdAt: -1 });

export default mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
