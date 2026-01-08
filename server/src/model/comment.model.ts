import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  website: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId;
  upvotes: number;
  downvotes: number;
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, maxlength: 1000 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    website: { type: Schema.Types.ObjectId, ref: "Website", required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
