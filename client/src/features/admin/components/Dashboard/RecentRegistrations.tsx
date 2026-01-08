import React from "react";
import { HiOutlineUserAdd, HiOutlinePlus } from "react-icons/hi";

const RecentRegistrations: React.FC = () => {
  const userIds = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-(--color-sextary)">
          New Registrations
        </h2>
        <HiOutlineUserAdd size={24} className="text-quaternary" />
      </div>
      <div className="flex flex-wrap gap-4">
        {userIds.map((i) => (
          <div key={i} className="group relative">
            <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-md bg-(--color-primary) flex items-center justify-center text-quaternary font-black hover:scale-110 transition-all cursor-pointer overflow-hidden">
              <img
                src={`https://i.pravatar.cc/150?u=${i}`}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-sextary text-white text-[9px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              @user_{i}
            </div>
          </div>
        ))}
        <button className="w-12 h-12 rounded-2xl border-2 border-dashed border-(--color-secondary) flex items-center justify-center text-(--color-quinary)/30 hover:bg-quaternary/5 hover:border-quaternary hover:text-quaternary transition-all">
          <HiOutlinePlus size={20} />
        </button>
      </div>
      <p className="mt-6 text-xs font-bold text-(--color-quinary)/40 bg-(--color-primary)/30 p-4 rounded-2xl border border-(--color-secondary)/20">
        Insights: Registration grew by{" "}
        <span className="text-green-500 font-black">+24%</span> compared to the
        previous week.
      </p>
    </div>
  );
};

export default RecentRegistrations;
