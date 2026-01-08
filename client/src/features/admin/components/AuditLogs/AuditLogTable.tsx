import { format } from "date-fns";
import { HiEye, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { AuditLog } from "../../../../types";
import { ACTION_COLORS } from "./constants";

interface AuditLogTableProps {
  logs: AuditLog[];
  loading: boolean;
  page: number;
  totalPages: number;
  totalLogs: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onOpenDetails: (log: AuditLog) => void;
}

const AuditLogTable: React.FC<AuditLogTableProps> = ({
  logs,
  loading,
  page,
  totalPages,
  totalLogs,
  setPage,
  onOpenDetails,
}) => {
  return (
    <div className="flex-1 bg-white rounded-4xl shadow-sm border border-(--color-secondary)/10 overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  Loading logs...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-(--color-secondary) flex items-center justify-center text-white text-xs font-bold">
                        {log.adminName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {log.adminName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ACTION_COLORS[log.action] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {log.entityType}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {log.entityId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(log.createdAt), "MMM d, yyyy HH:mm")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => onOpenDetails(log)}
                      className="p-2 text-gray-400 hover:text-(--color-tertiary) hover:bg-(--color-tertiary)/10 rounded-full transition-colors"
                    >
                      <HiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing logs {logs.length > 0 ? (page - 1) * 20 + 1 : 0}-
          {Math.min(page * 20, totalLogs)} of {totalLogs}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 enabled:hover:bg-white disabled:opacity-50 transition-colors"
          >
            <HiChevronLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-gray-200 enabled:hover:bg-white disabled:opacity-50 transition-colors"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogTable;
