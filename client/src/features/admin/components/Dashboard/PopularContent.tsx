import React from "react";
import { HiOutlineThumbUp } from "react-icons/hi";

interface PopularItem {
  name: string;
  category: string;
  upvotes: number;
  rating: number;
}

interface PopularContentProps {
  items: PopularItem[];
}

const PopularContent: React.FC<PopularContentProps> = ({ items }) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-(--color-sextary)">
          Popular Content
        </h2>
        <HiOutlineThumbUp size={24} className="text-(--color-quinary)/30" />
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-4 rounded-3xl hover:bg-(--color-primary)/20 transition-all border border-transparent hover:border-(--color-secondary)/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center text-xs font-black text-(--color-quinary)/40">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm font-black text-(--color-sextary)">
                  {item.name}
                </p>
                <span className="text-[10px] font-bold text-quaternary uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs font-black text-(--color-sextary)">
                <HiOutlineThumbUp size={14} className="text-quaternary" />
                {item.upvotes}
              </div>
              <div className="text-[10px] font-bold text-(--color-quinary)/30 uppercase tracking-widest">
                Rating: {item.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularContent;
