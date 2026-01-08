import api from "../../../services/api";
import type { Website } from "../../../types";

export const websiteApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get("/websites", { params }),
  getTrending: () => api.get("/websites/trending"),
  getById: (id: string) => api.get(`/websites/${id}`),
  create: (websiteData: Partial<Website>) => api.post("/websites", websiteData),
  getCategories: () => api.get("/categories"),
};

export const userApi = {
  getDashboardStats: () => api.get("/users/dashboard"),
  getMyContributions: () => api.get("/users/my-contributions"),
};
