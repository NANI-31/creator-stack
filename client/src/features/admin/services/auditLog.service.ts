import axios from "../../../services/api";
import type { AuditLog } from "../../../types";

export interface AuditLogsResponse {
  logs: AuditLog[];
  total: number;
  page: number;
  pages: number;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  adminId?: string;
  action?: string;
  entityType?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const getAuditLogs = async (
  filters: AuditLogFilters
): Promise<{ success: boolean; data: AuditLogsResponse; message?: string }> => {
  try {
    const response = await axios.get("/admin/audit-logs", { params: filters });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
