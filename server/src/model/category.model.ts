import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parentCategory?: mongoose.Types.ObjectId;
  websiteCount: number;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String },
    icon: { type: String },
    color: { type: String },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    websiteCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
