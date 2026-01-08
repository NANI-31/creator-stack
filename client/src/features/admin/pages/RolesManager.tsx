import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiPlus,
  HiTrash,
  HiSave,
  HiShieldCheck,
  HiUsers,
  HiCheck,
} from "react-icons/hi";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  type Role,
} from "../services/role.service";
import Spinner from "../../../components/ui/Spinner";

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

const RolesManager: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Edit Form State
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPerms, setEditPerms] = useState<string[]>([]);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data.data);
      if (data.data.length > 0 && !selectedRole) {
        selectRole(data.data[0]);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const selectRole = (role: Role) => {
    setSelectedRole(role);
    setEditName(role.name);
    setEditDesc(role.description);
    setEditPerms(role.permissions);
    setIsNew(false);
  };

  const handleAddNew = () => {
    const newRole: Role = {
      _id: "new",
      name: "New Role",
      description: "",
      permissions: [],
      isSystem: false,
    };
    setSelectedRole(newRole);
    setEditName("");
    setEditDesc("");
    setEditPerms([]);
    setIsNew(true);
  };

  const togglePermission = (perm: string) => {
    setEditPerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = async () => {
    if (!editName.trim()) return toast.error("Role name is required");

    try {
      setSaving(true);
      if (isNew) {
        await createRole({
          name: editName,
          description: editDesc,
          permissions: editPerms,
        });
        toast.success("Role created");
      } else if (selectedRole) {
        await updateRole(selectedRole._id, {
          name: editName,
          description: editDesc,
          permissions: editPerms,
        });
        toast.success("Role updated");
      }
      await fetchRoles();
      // Refetch logic resets selection depending on implementation,
      // ideally we find the updated role and re-select it, but simple fetch is okay for now.
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save role");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRole || isNew || selectedRole.isSystem) return;
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await deleteRole(selectedRole._id);
      toast.success("Role deleted");
      fetchRoles();
      setSelectedRole(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete role");
    }
  };

  if (loading && roles.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
        {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div> */}
      </div>
    );

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 p-1">
      {/* LEFT PANEL: ROLES LIST */}
      <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <HiShieldCheck className="text-purple-600" /> Roles
          </h2>
          <button
            onClick={handleAddNew}
            className="p-2 bg-white dark:bg-gray-700 text-purple-600 hover:text-purple-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors"
            title="Add New Role"
          >
            <HiPlus size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {roles.map((role) => (
            <div
              key={role._id}
              onClick={() => selectRole(role)}
              className={`p-3 rounded-xl cursor-pointer transition-all border ${
                selectedRole?._id === role._id
                  ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 shadow-sm"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 border-transparent"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`font-semibold ${
                      selectedRole?._id === role._id
                        ? "text-purple-700 dark:text-purple-300"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {role.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {role.description || "No description"}
                  </p>
                </div>
                {role.isSystem && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 text-[10px] uppercase font-bold rounded-full">
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

      {/* RIGHT PANEL: EDITOR */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden relative">
        {!selectedRole ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a role to edit permissions
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start bg-gray-50 dark:bg-gray-800/50">
              <div className="w-full max-w-lg space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Role Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled={selectedRole.isSystem && !isNew}
                    className="w-full text-xl font-bold bg-transparent border-b-2 border-transparent focus:border-purple-500 focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-300"
                    placeholder="Enter Role Name"
                  />
                  {selectedRole.isSystem && !isNew && (
                    <p className="text-xs text-yellow-600 mt-1">
                      System role names cannot be changed.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full text-sm bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:outline-none text-gray-600 dark:text-gray-300 pb-1"
                    placeholder="Enter brief description"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isNew && !selectedRole.isSystem && (
                  <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Role"
                  >
                    <HiTrash size={20} />
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition-all disabled:opacity-50"
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
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">
                Permissions configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(PERMISSIONS_MODULES).map(([module, perms]) => (
                  <div
                    key={module}
                    className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-gray-700 dark:text-gray-200">
                        {module}
                      </h4>
                      <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600 ml-3"></div>
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
                                ? "bg-purple-600 border-purple-600 text-white"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-purple-400"
                            }`}
                          >
                            {editPerms.includes(perm) && <HiCheck size={14} />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={editPerms.includes(perm)}
                            onChange={() => togglePermission(perm)}
                          />
                          <span
                            className={`text-sm ${
                              editPerms.includes(perm)
                                ? "text-gray-900 dark:text-gray-100 font-medium"
                                : "text-gray-500 dark:text-gray-400"
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
          </>
        )}
      </div>
    </div>
  );
};

export default RolesManager;
