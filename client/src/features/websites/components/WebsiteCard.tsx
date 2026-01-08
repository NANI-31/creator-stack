import React from "react";
import { HiArrowSmUp, HiChatAlt, HiStar, HiExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { Category } from "../../../types";

interface WebsiteCardProps {
  id: string;
  name: string;
  description: string;
  category: string | Category;
  upvotes: number;
  rating: number;
  comments: number;
  url?: string;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({
  id,
  name,
  description,
  category,
  upvotes,
  rating,
  comments,
  url,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-(--color-secondary)/30 hover:border-quaternary/40 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-tertiary to-quaternary rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-bold text-(--color-sextary) group-hover:text-quaternary transition-colors">
              <Link to={`/tool/${id}`}>{name}</Link>
            </h3>
            <span className="text-[10px] uppercase tracking-wider font-bold text-quaternary">
              {typeof category === "string"
                ? category
                : category?.name || "Resource"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg text-xs font-bold text-quaternary">
          <HiStar className="text-(--color-tertiary)" />
          {rating.toFixed(1)}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-(--color-quinary)/70 line-clamp-2 leading-relaxed mb-4">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-(--color-secondary)/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-(--color-quinary)/60">
            <HiArrowSmUp size={16} className="text-green-500" />
            {upvotes}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-(--color-quinary)/60">
            <HiChatAlt size={16} className="text-blue-400" />
            {comments}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-(--color-quinary)/50 hover:text-quaternary transition-colors flex items-center gap-1"
            >
              <HiExternalLink size={14} />
              Visit
            </a>
          )}
          <Link
            to={`/tool/${id}`}
            className="text-xs font-bold text-quaternary hover:underline decoration-2 underline-offset-4"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;
