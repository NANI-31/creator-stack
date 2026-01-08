import React, { useEffect, useState, useCallback } from "react";
import { commentsApi } from "./comments.api";
import type { Comment } from "../../types/comment.types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Spinner from "../../components/ui/Spinner";

interface CommentListProps {
  websiteId: string;
  websiteAuthorId?: string;
}

const CommentList: React.FC<CommentListProps> = ({
  websiteId,
  websiteAuthorId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"top" | "newest">("newest");

  const fetchComments = useCallback(async () => {
    try {
      const response = await commentsApi.getWebsiteComments(websiteId, sortBy);
      if (response.success) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [websiteId, sortBy]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await commentsApi.deleteComment(id);
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  // Build comment tree (flat to nested)
  const commentTree = (comments || [])
    .filter((c) => !c.parentComment)
    .map((parent) => ({
      ...parent,
      replies: comments.filter((c) => c.parentComment === parent._id),
    }));

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-(--color-sextary)">
            Discussion ({comments.length})
          </h3>
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setSortBy("newest")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sortBy === "newest"
                  ? "bg-white text-quaternary shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy("top")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sortBy === "top"
                  ? "bg-white text-quaternary shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Top
            </button>
          </div>
        </div>
        <CommentForm websiteId={websiteId} onSuccess={fetchComments} />
      </div>

      <div className="flex flex-col gap-10">
        {commentTree.length === 0 ? (
          <div className="py-12 text-center bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-400 font-medium">
              No comments yet. Be the first to start the conversation!
            </p>
          </div>
        ) : (
          commentTree.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              replies={comment.replies}
              websiteAuthorId={websiteAuthorId}
              onDelete={handleDelete}
              onRefresh={fetchComments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
