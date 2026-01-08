import mongoose, { Schema, Document } from "mongoose";

export interface IWebsite extends Document {
  name: string;
  url: string;
  description: string;
  category: mongoose.Types.ObjectId;
  tags: string[];
  thumbnail: string;
  author: mongoose.Types.ObjectId;
  stats: {
    upvotes: number;
    downvotes: number;
    rating: number;
    reviewCount: number;
    commentCount: number;
  };
  isFeatured: boolean;
  status: "Pending" | "Approved" | "Rejected";
}

const websiteSchema = new Schema<IWebsite>(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String }],
    thumbnail: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stats: {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
      commentCount: { type: Number, default: 0 },
    },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Website = mongoose.model<IWebsite>("Website", websiteSchema);
export default Website;
