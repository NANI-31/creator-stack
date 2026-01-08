import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import type { RoleFilter, StatusFilter } from "./types";

interface UsersFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: RoleFilter;
  setRoleFilter: (role: RoleFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
}

const UsersFilters: React.FC<UsersFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-(--color-secondary)/30 shadow-sm flex flex-col xl:flex-row items-center gap-4">
      <div className="relative flex-1 w-full max-w-md">
        <HiOutlineSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/30"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-(--color-primary)/20 border-transparent border focus:border-quaternary/20 focus:bg-white rounded-2xl outline-none text-sm font-medium transition-all"
        />
      </div>

      <div className="flex items-center gap-4 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest ml-2 whitespace-nowrap">
            Role:
          </span>
          <select
            className="bg-(--color-primary)/20 border-transparent rounded-xl px-4 py-2 text-xs font-bold text-(--color-sextary) outline-none cursor-pointer hover:bg-(--color-primary)/30 transition-all"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="w-px h-8 bg-(--color-secondary)/20" />

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest ml-2 whitespace-nowrap">
            Status:
          </span>
          <select
            className="bg-(--color-primary)/20 border-transparent rounded-xl px-4 py-2 text-xs font-bold text-(--color-sextary) outline-none cursor-pointer hover:bg-(--color-primary)/30 transition-all"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Banned">Banned</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UsersFilters;
