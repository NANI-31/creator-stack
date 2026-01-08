import React from "react";
import { HiCheck } from "react-icons/hi";

// Hardcoded matching backend permissions
const PERMISSIONS_MODULES = {
  WEBSITE: ["WEBSITE_VIEW", "WEBSITE_MANAGE", "WEBSITE_APPROVE"],
  USER: ["USER_VIEW", "USER_MANAGE", "USER_BAN"],
  ROLE: ["ROLE_VIEW", "ROLE_MANAGE"],
  SETTINGS: ["SETTINGS_VIEW", "SETTINGS_MANAGE"],
  ANALYTICS: ["ANALYTICS_VIEW"],
  AUDIT: ["AUDIT_VIEW"],
  REPORT: ["REPORT_VIEW", "REPORT_MANAGE"],
  CATEGORY: ["CATEGORY_MANAGE"],
};

interface PermissionsMatrixProps {
  editPerms: string[];
  onTogglePermission: (perm: string) => void;
}

const PermissionsMatrix: React.FC<PermissionsMatrixProps> = ({
  editPerms,
  onTogglePermission,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h3 className="text-sm font-bold text-black uppercase mb-4">
        Permissions configuration
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(PERMISSIONS_MODULES).map(([module, perms]) => (
          <div
            key={module}
            className="bg-secondary/50 rounded-xl p-4 border border-secondary"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-gray-700">{module}</h4>
              <div className="h-px flex-1 bg-gray-200 ml-3"></div>
            </div>
            <div className="space-y-2">
              {perms.map((perm) => (
                <label
                  key={perm}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      editPerms.includes(perm)
                        ? "bg-tertiary border-tertiary text-white"
                        : "bg-white border-gray-300 group-hover:border-tertiary"
                    }`}
                  >
                    {editPerms.includes(perm) && <HiCheck size={14} />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={editPerms.includes(perm)}
                    onChange={() => onTogglePermission(perm)}
                  />
                  <span
                    className={`text-sm ${
                      editPerms.includes(perm)
                        ? "text-gray-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {perm.split("_")[1]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsMatrix;
