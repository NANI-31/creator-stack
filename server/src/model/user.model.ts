import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  role:
    | "User"
    | "Developer"
    | "Designer"
    | "Creator"
    | "Editor"
    | "Moderator"
    | "Admin";
  bio?: string;
  avatar?: string;
  websitesContributed: mongoose.Types.ObjectId[];
  savedWebsites: mongoose.Types.ObjectId[];
  isVerified: boolean;
  googleId?: string;
  reputation: number;
  status: "Active" | "Suspended" | "Banned";
  banReason?: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: [
        "User",
        "Developer",
        "Designer",
        "Creator",
        "Editor",
        "Moderator",
        "Admin",
      ],
      default: "Developer",
    },
    bio: { type: String, maxlength: 250 },
    avatar: { type: String },
    websitesContributed: [{ type: Schema.Types.ObjectId, ref: "Website" }],
    savedWebsites: [{ type: Schema.Types.ObjectId, ref: "Website" }],
    isVerified: { type: Boolean, default: false },
    googleId: { type: String },
    reputation: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Banned"],
      default: "Active",
    },
    banReason: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (err: any) {}
});

userSchema.methods.comparePassword = async function (password: string) {
  if (!this.password) return false;
  return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
