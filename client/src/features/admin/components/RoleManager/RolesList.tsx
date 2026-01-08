import React from "react";
import { HiShieldCheck, HiPlus, HiUsers } from "react-icons/hi";
import type { Role } from "../../services/role.service";

interface RolesListProps {
  roles: Role[];
  selectedRole: Role | null;
  onSelectRole: (role: Role) => void;
  onAddNew: () => void;
}

const RolesList: React.FC<RolesListProps> = ({
  roles,
  selectedRole,
  onSelectRole,
  onAddNew,
}) => {
  return (
    <div className="w-full md:w-1/3 bg-primary rounded-xl shadow-sm border border-secondary flex flex-col overflow-hidden">
      <div className="p-4 border-b border-secondary flex justify-between items-center bg-secondary">
        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <HiShieldCheck className="text-tertiary" /> Roles
        </h2>
        <button
          onClick={onAddNew}
          className="p-2 bg-primary text-tertiary hover:text-quaternary rounded-lg shadow-sm border border-secondary transition-colors"
          title="Add New Role"
        >
          <HiPlus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {roles.map((role) => (
          <div
            key={role._id}
            onClick={() => onSelectRole(role)}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedRole?._id === role._id
                ? "bg-tertiary/10 border-tertiary/30 shadow-sm"
                : "hover:bg-gray-50 border-transparent"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`font-semibold ${
                    selectedRole?._id === role._id
                      ? "text-quaternary"
                      : "text-gray-700"
                  }`}
                >
                  {role.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {role.description || "No description"}
                </p>
              </div>
              {role.isSystem && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold rounded-full">
                  System
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-400 gap-1">
              <HiUsers /> {role.userCount || 0} users
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesList;
