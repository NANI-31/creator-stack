import { format } from "date-fns";
import { HiX } from "react-icons/hi";
import type { AuditLog } from "../../../../types";
import { ACTION_COLORS } from "./constants";

interface AuditLogDetailModalProps {
  log: AuditLog;
  onClose: () => void;
}

const AuditLogDetailModal: React.FC<AuditLogDetailModalProps> = ({
  log,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">Log Details</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
          >
            <HiX size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Admin
              </label>
              <p className="font-medium text-gray-900">{log.adminName}</p>
              <p className="text-xs text-gray-500">{log.adminId}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Timestamp
              </label>
              <p className="font-medium text-gray-900">
                {format(new Date(log.createdAt), "PPpp")}
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Action
              </label>
              <span
                className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium ${
                  ACTION_COLORS[log.action] || "bg-gray-100 text-gray-800"
                }`}
              >
                {log.action}
              </span>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Resource
              </label>
              <p className="font-medium text-gray-900">{log.entityType}</p>
              <p className="text-xs text-gray-500 font-mono">{log.entityId}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                IP Address
              </label>
              <p className="font-medium text-gray-900">
                {log.ipAddress || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                User Agent
              </label>
              <p
                className="text-sm text-gray-900 truncate"
                title={log.userAgent}
              >
                {log.userAgent || "N/A"}
              </p>
            </div>
          </div>

          {log.details && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <h4 className="font-bold text-gray-900 text-sm">Changes</h4>

              {log.details.notes && (
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 italic">
                  "{log.details.notes}"
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {log.details.before && (
                  <div className="border border-red-100 bg-red-50/30 rounded-lg p-3">
                    <div className="text-xs font-bold text-red-500 mb-2 uppercase">
                      Before
                    </div>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono overflow-auto max-h-40">
                      {JSON.stringify(log.details.before, null, 2)}
                    </pre>
                  </div>
                )}
                {log.details.after && (
                  <div className="border border-green-100 bg-green-50/30 rounded-lg p-3">
                    <div className="text-xs font-bold text-green-500 mb-2 uppercase">
                      After
                    </div>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono overflow-auto max-h-40">
                      {JSON.stringify(log.details.after, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogDetailModal;
