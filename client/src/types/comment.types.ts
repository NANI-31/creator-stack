import type { User } from "./index";

export interface Comment {
  _id: string;
  content: string;
  author: User;
  website: string;
  parentComment?: string | null;
  upvotes: number;
  downvotes: number;
  userVote?: "upvote" | "downvote" | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDTO {
  content: string;
  websiteId: string;
  parentCommentId?: string;
}
