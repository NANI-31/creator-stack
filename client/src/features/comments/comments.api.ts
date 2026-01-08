import api from "../../services/api";
import type { CreateCommentDTO } from "../../types/comment.types";

export const commentsApi = {
  createComment: async (data: CreateCommentDTO) => {
    const response = await api.post("/comments", data);
    return response.data;
  },

  getWebsiteComments: async (websiteId: string, sortBy?: string) => {
    const response = await api.get(`/comments/website/${websiteId}`, {
      params: { sortBy },
    });
    return response.data;
  },

  deleteComment: async (id: string) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },

  voteComment: async (id: string, voteType: "upvote" | "downvote") => {
    const response = await api.post(`/comments/${id}/vote`, { voteType });
    return response.data;
  },
};
