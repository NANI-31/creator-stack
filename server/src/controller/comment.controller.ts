import { Request, Response } from "express";
import Comment from "../model/comment.model";
import Website from "../model/website.model";
import Vote from "../model/vote.model";
import { sendResponse, sendError } from "../utils/responseHandler";

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, websiteId, parentCommentId } = req.body;
    const authorId = (req as any).user?._id;

    if (!content || !websiteId) {
      return sendError(res, 400, "Content and Website ID are required");
    }

    const website = await Website.findById(websiteId);
    if (!website) {
      return sendError(res, 404, "Website not found");
    }

    const comment = new Comment({
      content,
      author: authorId,
      website: websiteId,
      parentComment: parentCommentId || null,
    });

    await comment.save();

    // Populate author for the response
    await comment.populate("author", "username profileImage");

    return sendResponse(
      res,
      201,
      true,
      "Comment created successfully",
      comment
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// Get all comments for a website
export const getWebsiteComments = async (req: Request, res: Response) => {
  try {
    const { websiteId } = req.params;
    const { sortBy } = req.query; // "top" or "newest"

    let sortQuery: any = { createdAt: 1 }; // Default: Newest at bottom for thread view
    if (sortBy === "top") {
      sortQuery = { upvotes: -1, createdAt: -1 };
    } else if (sortBy === "newest") {
      sortQuery = { createdAt: -1 };
    }

    const allComments = await Comment.find({ website: websiteId })
      .populate("author", "username profileImage")
      .sort(sortQuery);

    const userId = (req as any).user?._id;

    let commentsWithVote: any[] = allComments;
    if (userId) {
      const userVotes = await Vote.find({
        user: userId,
        target: { $in: allComments.map((c) => c._id) },
        targetType: "Comment",
      });

      const voteMap = new Map(
        userVotes.map((v) => [v.target.toString(), v.voteType])
      );

      commentsWithVote = allComments.map((comment) => {
        const commentObj = comment.toObject();
        (commentObj as any).userVote =
          voteMap.get(comment._id.toString()) || null;
        return commentObj;
      });
    }

    return sendResponse(
      res,
      200,
      true,
      "Comments fetched successfully",
      commentsWithVote
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authorId = (req as any).user?._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return sendError(res, 404, "Comment not found");
    }

    // Check if user is the author or an admin
    if (
      comment.author.toString() !== authorId.toString() &&
      (req as any).user?.role !== "Admin"
    ) {
      return sendError(
        res,
        403,
        "You are not authorized to delete this comment"
      );
    }

    await Comment.findByIdAndDelete(id);

    // Also delete replies if any
    await Comment.deleteMany({ parentComment: id });

    return sendResponse(res, 200, true, "Comment deleted successfully");
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// Vote on a comment
export const voteComment = async (req: Request, res: Response) => {
  try {
    const { id: commentId } = req.params;
    const { voteType } = req.body; // "upvote" or "downvote"
    const userId = (req as any).user?._id;

    if (!voteType || !["upvote", "downvote"].includes(voteType)) {
      return sendError(res, 400, "Invalid vote type");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return sendError(res, 404, "Comment not found");
    }

    // Check for existing vote
    const existingVote = await Vote.findOne({
      user: userId,
      target: commentId,
      targetType: "Comment",
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Toggle Off
        await Vote.findByIdAndDelete(existingVote._id);

        const update =
          voteType === "upvote"
            ? { $inc: { upvotes: -1 } }
            : { $inc: { downvotes: -1 } };

        const updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          update,
          { new: true }
        );

        return sendResponse(res, 200, true, "Vote removed successfully", {
          upvotes: updatedComment?.upvotes || 0,
          downvotes: updatedComment?.downvotes || 0,
          userVote: null,
        });
      } else {
        // Switch Vote Type
        existingVote.voteType = voteType;
        await existingVote.save();

        const update =
          voteType === "upvote"
            ? { $inc: { upvotes: 1, downvotes: -1 } }
            : { $inc: { upvotes: -1, downvotes: 1 } };

        const updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          update,
          { new: true }
        );

        return sendResponse(res, 200, true, "Vote updated successfully", {
          upvotes: updatedComment?.upvotes || 0,
          downvotes: updatedComment?.downvotes || 0,
          userVote: voteType,
        });
      }
    }

    // New Vote
    const newVote = new Vote({
      user: userId,
      target: commentId,
      targetType: "Comment",
      voteType,
    });
    await newVote.save();

    const update =
      voteType === "upvote"
        ? { $inc: { upvotes: 1 } }
        : { $inc: { downvotes: 1 } };

    const updatedComment = await Comment.findByIdAndUpdate(commentId, update, {
      new: true,
    });

    return sendResponse(res, 200, true, "Vote recorded successfully", {
      upvotes: updatedComment?.upvotes || 0,
      downvotes: updatedComment?.downvotes || 0,
      userVote: voteType,
    });
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};
