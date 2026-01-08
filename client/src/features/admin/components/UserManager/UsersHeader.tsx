import React from "react";
import { HiOutlineUserAdd } from "react-icons/hi";

interface UsersHeaderProps {
  onInvite: () => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onInvite }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
          Users Management
        </h1>
        <p className="text-(--color-quinary)/60 font-medium">
          Manage users, roles, and platform access.
        </p>
      </div>
      <button
        onClick={onInvite}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-(--color-secondary)/30 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-quaternary/30 text-(--color-sextary) hover:text-quaternary transition-all shadow-sm"
      >
        <HiOutlineUserAdd size={16} /> Invite User
      </button>
    </div>
  );
};

export default UsersHeader;
