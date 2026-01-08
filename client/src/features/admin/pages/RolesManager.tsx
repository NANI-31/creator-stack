import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  type Role,
} from "../services/role.service";
import Spinner from "../../../components/ui/Spinner";
import { RolesList, RoleEditor } from "../components/RoleManager";

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
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to fetch roles");
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
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to save role");
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
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to delete role");
    }
  };

  if (loading && roles.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 p-1">
      <RolesList
        roles={roles}
        selectedRole={selectedRole}
        onSelectRole={selectRole}
        onAddNew={handleAddNew}
      />

      <RoleEditor
        selectedRole={selectedRole}
        isNew={isNew}
        editName={editName}
        editDesc={editDesc}
        editPerms={editPerms}
        saving={saving}
        onNameChange={setEditName}
        onDescChange={setEditDesc}
        onTogglePermission={togglePermission}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RolesManager;
