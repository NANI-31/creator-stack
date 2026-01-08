import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean; // Cannot be deleted if true
  userCount?: number; // Virtual for counts
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    permissions: [{ type: String }], // Array of permission strings (e.g., "WEBSITE_VIEW")
    isSystem: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Role = mongoose.model<IRole>("Role", roleSchema);
export default Role;
