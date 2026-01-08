import React from "react";
import { HiOutlineX, HiOutlineCheckCircle } from "react-icons/hi";
import type { User } from "./types";

interface RoleModalProps {
  user: User;
  onClose: () => void;
  onUpdateRole: (role: "User" | "Moderator" | "Admin") => void;
}

const RoleModal: React.FC<RoleModalProps> = ({
  user,
  onClose,
  onUpdateRole,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-sextary/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-sm rounded-4xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-(--color-sextary)">
            Change Role
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-sm font-black text-sextary">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          {["User", "Moderator", "Admin"].map((role) => (
            <button
              key={role}
              onClick={() => onUpdateRole(role as any)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                user.role === role
                  ? "bg-quaternary/5 border-quaternary/30 text-quaternary"
                  : "bg-white border-gray-100 hover:border-gray-200 text-gray-600"
              }`}
            >
              <span className="font-bold text-sm">{role}</span>
              {user.role === role && <HiOutlineCheckCircle size={20} />}
            </button>
          ))}
        </div>

        <button className="w-full mt-6 py-3 bg-quaternary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-500/20">
          Update Role
        </button>
      </div>
    </div>
  );
};

export default RoleModal;
