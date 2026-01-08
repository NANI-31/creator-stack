import React from "react";
import { HiArrowSmUp, HiChatAlt, HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { Category } from "../../../types";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string | Category;
  thumbnail: string;
  upvotes: number;
  rating: number;
  comments: number;
}

const ToolCard: React.FC<ToolCardProps> = ({
  id,
  name,
  description,
  category,
  thumbnail,
  upvotes,
  rating,
  comments,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-(--color-secondary)/30 hover:border-quaternary/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="aspect-video w-full bg-(--color-secondary)/10 overflow-hidden relative">
        <img
          src={thumbnail || "https://via.placeholder.com/400x225"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-quaternary shadow-sm">
          <HiStar className="text-(--color-tertiary)" />
          {rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-quaternary bg-orange-50 px-2 py-1 rounded-md">
            {typeof category === "string"
              ? category
              : category?.name || "Resource"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-(--color-sextary) mb-2 group-hover:text-quaternary transition-colors">
          <Link to={`/tool/${id}`}>{name}</Link>
        </h3>

        <p className="text-sm text-(--color-quinary)/70 line-clamp-2 leading-relaxed mb-6 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-(--color-secondary)/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs font-semibold text-(--color-quinary)/60">
              <HiArrowSmUp size={18} className="text-green-500" />
              {upvotes}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-(--color-quinary)/60">
              <HiChatAlt size={18} className="text-blue-400" />
              {comments}
            </div>
          </div>

          <button className="text-xs font-bold text-quaternary hover:underline decoration-2 underline-offset-4">
            <Link to={`/tool/${id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
