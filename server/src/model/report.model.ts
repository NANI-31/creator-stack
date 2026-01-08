import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  type: "Website" | "Comment" | "User";
  targetId: mongoose.Types.ObjectId;
  targetName: string;
  targetPreview: string;
  reporter: mongoose.Types.ObjectId;
  reason: "Spam" | "Abuse" | "Misleading" | "Copyright" | "Other";
  severity: "Low" | "Medium" | "High";
  status: "Pending" | "Resolved" | "Dismissed";
  resolutionNotes?: string;
  resolvedBy?: mongoose.Types.ObjectId;
}

const reportSchema = new Schema<IReport>(
  {
    type: {
      type: String,
      enum: ["Website", "Comment", "User"],
      required: true,
    },
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetName: { type: String, required: true },
    targetPreview: { type: String, required: true },
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: {
      type: String,
      enum: ["Spam", "Abuse", "Misleading", "Copyright", "Other"],
      required: true,
    },
    severity: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Dismissed"],
      default: "Pending",
    },
    resolutionNotes: { type: String },
    resolvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Report = mongoose.model<IReport>("Report", reportSchema);
export default Report;
