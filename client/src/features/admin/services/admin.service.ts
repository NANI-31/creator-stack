import api from "../../../services/api";

export interface SubmissionParams {
  status?: string;
  search?: string;
}

export interface UserParams {
  role?: string;
  status?: string;
  search?: string;
}

export interface ReportParams {
  type?: string;
  status?: string;
}

export const adminApi = {
  // Submissions
  getSubmissions: (params?: SubmissionParams) =>
    api.get("/admin/submissions", { params }),
  updateSubmissionStatus: (id: string, status: string) =>
    api.patch(`/admin/submissions/${id}/status`, { status }),

  // Users
  getUsers: (params?: UserParams) => api.get("/admin/users", { params }),
  updateUserRole: (id: string, role: string) =>
    api.patch(`/admin/users/${id}/role`, { role }),
  updateUserStatus: (id: string, status: string, banReason?: string) =>
    api.patch(`/admin/users/${id}/status`, { status, banReason }),

  // Reports
  getReports: (params?: ReportParams) => api.get("/admin/reports", { params }),
  updateReportStatus: (id: string, status: string, resolutionNotes?: string) =>
    api.patch(`/admin/reports/${id}/status`, { status, resolutionNotes }),

  // Categories
  getCategories: (params?: any) => api.get("/categories", { params }),
  updateCategory: (id: string, data: any) =>
    api.patch(`/categories/${id}`, data),
  createCategory: (data: any) => api.post("/categories", data),
  deleteCategory: (id: string, reassignmentCategoryId?: string) =>
    api.delete(`/categories/${id}`, { params: { reassignmentCategoryId } }),

  // Analytics
  getAnalytics: () => api.get("/admin/analytics"),

  // Settings
  getSettings: () => api.get("/admin/settings"),
  updateSettings: (data: any) => api.patch("/admin/settings", data),
};
