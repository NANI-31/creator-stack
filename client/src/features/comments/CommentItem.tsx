import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  HiThumbUp,
  HiThumbDown,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiTrash,
} from "react-icons/hi";
import type { Comment } from "../../types/comment.types";
import { useAppSelector } from "../../app/hooks";
import CommentForm from "./CommentForm";

import { commentsApi } from "./comments.api";

interface CommentItemProps {
  comment: Comment;
  replies?: Comment[];
  websiteAuthorId?: string;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  replies = [],
  websiteAuthorId,
  onDelete,
  onRefresh,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [localStats, setLocalStats] = useState({
    upvotes: comment.upvotes,
    downvotes: comment.downvotes,
    userVote: comment.userVote,
  });

  // Sync with props when refreshed
  React.useEffect(() => {
    setLocalStats({
      upvotes: comment.upvotes,
      downvotes: comment.downvotes,
      userVote: comment.userVote,
    });
  }, [comment.upvotes, comment.downvotes, comment.userVote]);

  const { user } = useAppSelector((state) => state.auth);

  const canDelete =
    user && (user._id === comment.author._id || user.role === "Admin");

  const isAuthor = websiteAuthorId === comment.author._id;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!user) {
      // Could trigger login modal here
      return;
    }

    try {
      const response = await commentsApi.voteComment(comment._id, voteType);
      if (response.success) {
        setLocalStats({
          upvotes: response.data.upvotes,
          downvotes: response.data.downvotes,
          userVote: response.data.userVote,
        });
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const isHelpful =
    localStats.upvotes - localStats.downvotes >= 5 &&
    localStats.upvotes / (localStats.upvotes + localStats.downvotes) >= 0.8;

  return (
    <div
      className={`flex gap-4 p-4 rounded-3xl transition-all duration-300 ${
        isAuthor
          ? "bg-linear-to-r from-tertiary/5 to-transparent border border-tertiary/10 shadow-xs"
          : isHelpful
          ? "bg-linear-to-r from-green-50/50 to-transparent border border-green-100 shadow-sm"
          : ""
      }`}
    >
      {/* Author Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 border shadow-sm ${
          isAuthor
            ? "bg-linear-to-br from-tertiary to-quaternary text-white border-white/20"
            : "bg-linear-to-br from-tertiary/20 to-quaternary/20 text-quaternary border-quaternary/10"
        }`}
      >
        {comment.author.username.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {/* Comment Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-bold ${
                isAuthor ? "text-quaternary" : "text-(--color-sextary)"
              }`}
            >
              {comment.author.username}
            </span>
            {isAuthor && (
              <span className="px-1.5 py-0.5 bg-tertiary/10 text-tertiary text-[9px] font-black uppercase tracking-tighter rounded-md border border-tertiary/20">
                Author
              </span>
            )}
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          {isHelpful && !isAuthor && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-tighter rounded-full animate-in fade-in zoom-in duration-500">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              Most Helpful
            </span>
          )}
        </div>

        {/* Comment Content */}
        <div className="text-sm text-(--color-quinary)/80 leading-relaxed">
          {comment.content}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center bg-gray-100/80 rounded-full px-1 py-0.5">
            {/* Upvote */}
            <div className="flex items-center">
              <button
                onClick={() => handleVote("upvote")}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${
                  localStats.userVote === "upvote"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
                title="Like"
              >
                {localStats.userVote === "upvote" ? (
                  <HiThumbUp size={18} />
                ) : (
                  <HiOutlineThumbUp size={18} />
                )}
              </button>
              <span
                className={`text-[11px] font-bold pr-2 -ml-0.5 ${
                  localStats.userVote === "upvote"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {localStats.upvotes}
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-4 bg-gray-300 mx-0.5" />

            {/* Downvote */}
            <div className="flex items-center">
              <button
                onClick={() => handleVote("downvote")}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${
                  localStats.userVote === "downvote"
                    ? "text-red-500 bg-red-50"
                    : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
                title="Dislike"
              >
                {localStats.userVote === "downvote" ? (
                  <HiThumbDown size={18} />
                ) : (
                  <HiOutlineThumbDown size={18} />
                )}
              </button>
              <span
                className={`text-[11px] font-bold pr-2 -ml-0.5 ${
                  localStats.userVote === "downvote"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {localStats.downvotes}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsReplying(!isReplying)}
            className="px-4 py-2 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Reply
          </button>

          {canDelete && (
            <button
              onClick={() => onDelete(comment._id)}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <HiTrash size={16} />
            </button>
          )}
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <CommentForm
              websiteId={comment.website}
              parentCommentId={comment._id}
              onSuccess={() => {
                setIsReplying(false);
                onRefresh();
              }}
              onCancel={() => setIsReplying(false)}
              placeholder={`Reply to ${comment.author.username}...`}
              submitLabel="Reply"
            />
          </div>
        )}

        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="mt-4 flex flex-col gap-6 pl-4 border-l-2 border-gray-100">
            {replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                websiteAuthorId={websiteAuthorId}
                onDelete={onDelete}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
