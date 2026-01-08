import React from "react";
import { HiTrash, HiSave } from "react-icons/hi";
import type { Role } from "../../services/role.service";
import PermissionsMatrix from "./PermissionsMatrix";

interface RoleEditorProps {
  selectedRole: Role | null;
  isNew: boolean;
  editName: string;
  editDesc: string;
  editPerms: string[];
  saving: boolean;
  onNameChange: (name: string) => void;
  onDescChange: (desc: string) => void;
  onTogglePermission: (perm: string) => void;
  onSave: () => void;
  onDelete: () => void;
}

const RoleEditor: React.FC<RoleEditorProps> = ({
  selectedRole,
  isNew,
  editName,
  editDesc,
  editPerms,
  saving,
  onNameChange,
  onDescChange,
  onTogglePermission,
  onSave,
  onDelete,
}) => {
  if (!selectedRole) {
    return (
      <div className="flex-1 bg-primary rounded-xl shadow-sm border border-secondary flex flex-col overflow-hidden relative">
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a role to edit permissions
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-primary rounded-xl shadow-sm border border-secondary flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="p-6 border-b border-secondary flex justify-between items-start bg-secondary">
        <div className="w-full max-w-lg space-y-4">
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-1">
              Role Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => onNameChange(e.target.value)}
              disabled={selectedRole.isSystem && !isNew}
              className="w-full text-xl font-bold bg-transparent border-b-2 border-transparent focus:border-tertiary focus:outline-none text-gray-800 placeholder-gray-500"
              placeholder="Enter Role Name"
            />
            {selectedRole.isSystem && !isNew && (
              <p className="text-xs text-yellow-600 mt-1">
                System role names cannot be changed.
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-1">
              Description
            </label>
            <input
              type="text"
              value={editDesc}
              onChange={(e) => onDescChange(e.target.value)}
              className="w-full text-sm bg-transparent border-b border-gray-200 focus:border-tertiary focus:outline-none text-gray-600 pb-1"
              placeholder="Enter brief description"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && !selectedRole.isSystem && (
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Role"
            >
              <HiTrash size={20} />
            </button>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-tertiary hover:bg-quaternary text-white rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <HiSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Permissions Matrix */}
      <PermissionsMatrix
        editPerms={editPerms}
        onTogglePermission={onTogglePermission}
      />
    </div>
  );
};

export default RoleEditor;
