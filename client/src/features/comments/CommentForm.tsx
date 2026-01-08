import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { commentsApi } from "./comments.api";
import { useAppSelector } from "../../app/hooks";

interface CommentFormProps {
  websiteId: string;
  parentCommentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  submitLabel?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  websiteId,
  parentCommentId,
  onSuccess,
  onCancel,
  placeholder = "Add a comment...",
  submitLabel = "Post Comment",
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await commentsApi.createComment({
        content,
        websiteId,
        parentCommentId,
      });
      setContent("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
        <p className="text-sm text-gray-500">
          Please{" "}
          <span className="font-bold text-quaternary cursor-pointer hover:underline">
            sign in
          </span>{" "}
          to leave a comment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-tertiary to-quaternary flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="flex-1 p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-quaternary/40 focus:ring-4 focus:ring-orange-500/5 transition-all resize-none text-sm"
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
          disabled={!content.trim()}
          className="px-6!"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
