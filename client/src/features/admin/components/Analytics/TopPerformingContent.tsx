import React from "react";
import {
  HiOutlineEye,
  HiOutlineStar,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { type ContentItem } from "./types";

interface TopPerformingContentProps {
  data: ContentItem[];
}

const TopPerformingContent: React.FC<TopPerformingContentProps> = ({
  data,
}) => {
  return (
    <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-(--color-secondary)/10 flex justify-between items-center">
        <h3 className="text-lg font-black text-(--color-sextary)">
          Top Performing Content
        </h3>
        <button className="text-xs font-black text-quaternary uppercase tracking-widest hover:text-orange-600">
          View All
        </button>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-150">
          <thead className="bg-(--color-primary)/5 border-b border-(--color-secondary)/10">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Website
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Category
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-center">
                Views
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-center">
                Rating
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-secondary)/10">
            {data.map((item, i) => (
              <tr key={i} className="group hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-black text-(--color-sextary)">
                    {item.title}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-bold uppercase text-gray-500">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-gray-600">
                    <HiOutlineEye size={14} className="text-gray-400" />
                    {item.views}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-orange-500">
                    <HiOutlineStar size={14} />
                    {item.rating}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-quaternary rounded-xl hover:bg-quaternary/5 transition-all">
                    <HiOutlineTrendingUp size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformingContent;
