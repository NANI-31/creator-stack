import type { AuditLog } from "../../../../types";

export interface AuditLogResponse {
  logs: AuditLog[];
  pages: number;
  total: number;
}
