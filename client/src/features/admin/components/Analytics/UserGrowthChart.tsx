import React from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { type ChartData } from "./types";

interface UserGrowthChartProps {
  data: ChartData[];
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-4xl border border-(--color-secondary)/20 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-black text-(--color-sextary)">
          User Growth
        </h3>
        <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
          <HiOutlineUsers />
        </button>
      </div>

      <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 w-full group cursor-pointer"
          >
            <div className="relative w-full bg-gray-100 rounded-xl flex items-end overflow-hidden h-48 hover:bg-gray-50 transition-colors">
              <div
                className="w-full bg-quaternary opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-xl"
                style={{ height: `${d.value}%` }}
              />
              <div className="absolute top-2 w-full text-center text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.value}
              </div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGrowthChart;
