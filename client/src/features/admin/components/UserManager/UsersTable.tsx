import React from "react";
import {
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineBan,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import type { User } from "./types";
import { roleColors, statusColors } from "./constants";

interface UsersTableProps {
  users: User[];
  loading?: boolean;
  onRoleEdit: (user: User) => void;
  onAction: (user: User, action: "Suspend" | "Ban") => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  onRoleEdit,
  onAction,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm p-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-(--color-primary)/20 border-t-quaternary rounded-full animate-spin"></div>
        <p className="text-(--color-sextary) font-black animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-(--color-primary)/10 rounded-2xl">
          <HiOutlineDotsVertical
            size={32}
            className="text-(--color-quinary)/40"
          />
        </div>
        <div>
          <h3 className="text-lg font-black text-(--color-sextary)">
            No users found
          </h3>
          <p className="text-sm text-(--color-quinary)/50">
            Try adjusting your filters or search query.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-250">
          <thead className="bg-(--color-primary)/20 border-b border-(--color-secondary)/20">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                User
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Role
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Stats
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Joined
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-secondary)/10">
            {users.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-(--color-primary)/10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border border-(--color-secondary)/20 bg-white"
                    />
                    <div>
                      <p className="text-sm font-black text-(--color-sextary) group-hover:text-quaternary transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-(--color-quinary)/50 font-medium flex items-center gap-1">
                        <HiOutlineMail size={10} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${
                      roleColors[user.role]
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${
                      statusColors[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-xs font-black text-(--color-sextary)">
                        {user.reputation}
                      </p>
                      <p className="text-[8px] font-bold text-(--color-quinary)/30 uppercase">
                        Rep
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black text-(--color-sextary)">
                        {user.submissions}
                      </p>
                      <p className="text-[8px] font-bold text-(--color-quinary)/30 uppercase">
                        Subs
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black text-(--color-sextary)">
                        {user.comments}
                      </p>
                      <p className="text-[8px] font-bold text-(--color-quinary)/30 uppercase">
                        Comms
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-(--color-quinary)/60">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onRoleEdit(user)}
                      className="p-2 text-(--color-quinary)/40 hover:text-quaternary hover:bg-quaternary/5 rounded-xl transition-all"
                      title="Change Role"
                    >
                      <HiOutlineShieldCheck size={18} />
                    </button>

                    {user.status !== "Banned" && (
                      <button
                        onClick={() => onAction(user, "Ban")}
                        className="p-2 text-(--color-quinary)/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Ban User"
                      >
                        <HiOutlineBan size={18} />
                      </button>
                    )}

                    <button className="p-2 text-(--color-quinary)/40 hover:text-(--color-sextary) hover:bg-(--color-primary)/40 rounded-xl transition-all">
                      <HiOutlineDotsVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
