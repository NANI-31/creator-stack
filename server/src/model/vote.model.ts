import mongoose, { Schema, Document } from "mongoose";

export interface IVote extends Document {
  user: mongoose.Types.ObjectId;
  target: mongoose.Types.ObjectId;
  targetType: "Website" | "Comment";
  voteType: "upvote" | "downvote";
}

const voteSchema = new Schema<IVote>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    target: { type: Schema.Types.ObjectId, required: true },
    targetType: { type: String, enum: ["Website", "Comment"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true }
);

// Ensure a user can only vote once per target
voteSchema.index({ user: 1, target: 1 }, { unique: true });

const Vote = mongoose.model<IVote>("Vote", voteSchema);
export default Vote;
