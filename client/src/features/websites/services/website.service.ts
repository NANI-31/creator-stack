import api from "../../../services/api";
import type { Website } from "../../../types";

export const websiteApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get("/websites", { params }),
  getTrending: () => api.get("/websites/trending"),
  getById: (id: string) => api.get(`/websites/${id}`),
  create: (websiteData: Partial<Website>) => api.post("/websites", websiteData),
  getCategories: () => api.get("/categories"),
  vote: (id: string, voteType: "upvote" | "downvote") =>
    api.post(`/websites/${id}/vote`, { voteType }),
};

export const userApi = {
  getDashboardStats: () => api.get("/users/dashboard"),
  getMyContributions: () => api.get("/users/my-contributions"),
  toggleSaved: (id: string) => api.post(`/users/saved/${id}`),
  getSaved: (params?: Record<string, unknown>) =>
    api.get("/users/saved", { params }),
};
