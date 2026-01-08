import React from "react";
import { HiSearch } from "react-icons/hi";
import { ACTION_COLORS } from "./constants";

interface AuditLogFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  actionFilter: string;
  setActionFilter: (value: string) => void;
  entityFilter: string;
  setEntityFilter: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const AuditLogFilters: React.FC<AuditLogFiltersProps> = ({
  search,
  setSearch,
  actionFilter,
  setActionFilter,
  entityFilter,
  setEntityFilter,
  handleSearch,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-(--color-secondary)/10 flex flex-wrap gap-4 items-center">
      <form onSubmit={handleSearch} className="relative flex-1 min-w-50">
        <HiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by Admin Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-(--color-tertiary)/20 text-sm"
        />
      </form>

      <select
        value={actionFilter}
        onChange={(e) => setActionFilter(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-tertiary)/20"
      >
        <option value="">All Actions</option>
        {Object.keys(ACTION_COLORS).map((action) => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>

      <select
        value={entityFilter}
        onChange={(e) => setEntityFilter(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-tertiary)/20"
      >
        <option value="">All Resources</option>
        <option value="Website">Website</option>
        <option value="User">User</option>
        <option value="Comment">Comment</option>
        <option value="Report">Report</option>
        <option value="Category">Category</option>
        <option value="Settings">Settings</option>
      </select>
    </div>
  );
};

export default AuditLogFilters;
