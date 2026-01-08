import React, { useState, useEffect, useCallback } from "react";
import { adminApi } from "../services/admin.service";
// Types
import type {
  User,
  RoleFilter,
  StatusFilter,
  UserRole,
} from "../components/UserManager/types";

// Modular Components
import UsersHeader from "../components/UserManager/UsersHeader";
import UsersFilters from "../components/UserManager/UsersFilters";
import UsersTable from "../components/UserManager/UsersTable";
import RoleModal from "../components/UserManager/RoleModal";
import ActionModal from "../components/UserManager/ActionModal";

const UsersManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [selectedAction, setSelectedAction] = useState<"Suspend" | "Ban">(
    "Suspend"
  );

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (roleFilter !== "All") params.role = roleFilter;
      if (statusFilter !== "All") params.status = statusFilter;
      if (searchQuery) params.search = searchQuery;

      const { data } = await adminApi.getUsers(params);
      console.log("Users API Response:", data);

      // Defensive check: ensure data.data is an array
      const usersArray = Array.isArray(data.data) ? data.data : [];

      // Map API response to local User type
      const mappedUsers = usersArray.map((u: any) => ({
        id: u._id,
        name: u.fullName || u.username || "Unknown User",
        email: u.email,
        avatar:
          u.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`,
        role: u.role,
        status: u.status,
        reputation: u.reputation || 0,
        submissions: u.websitesContributed?.length || 0,
        comments: 0, // Need to implement comment count on backend if needed
        joinedDate: u.createdAt,
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [roleFilter, statusFilter, searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleEdit = (user: User) => {
    setCurrentUser(user);
    setIsRoleModalOpen(true);
  };

  const handleUpdateRole = async (role: UserRole) => {
    if (!currentUser) return;
    try {
      await adminApi.updateUserRole(currentUser.id, role);
      fetchUsers();
      setIsRoleModalOpen(false);
    } catch (error) {
      console.error("Failed to update role");
    }
  };

  const handleAction = (user: User, action: "Suspend" | "Ban") => {
    setCurrentUser(user);
    setSelectedAction(action);
    setActionReason("");
    setIsActionModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!currentUser) return;
    try {
      await adminApi.updateUserStatus(
        currentUser.id,
        selectedAction === "Suspend" ? "Suspended" : "Banned",
        actionReason
      );
      fetchUsers();
      setIsActionModalOpen(false);
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <UsersHeader onInvite={() => console.log("Invite clicked")} />

      <UsersFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <UsersTable
        users={users}
        loading={loading}
        onRoleEdit={handleRoleEdit}
        onAction={handleAction}
      />

      {isRoleModalOpen && currentUser && (
        <RoleModal
          user={currentUser}
          onClose={() => setIsRoleModalOpen(false)}
          onUpdateRole={handleUpdateRole}
        />
      )}

      {isActionModalOpen && currentUser && (
        <ActionModal
          user={currentUser}
          action={selectedAction}
          reason={actionReason}
          setReason={setActionReason}
          onClose={() => setIsActionModalOpen(false)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default UsersManager;
