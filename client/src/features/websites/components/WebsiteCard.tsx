import {
  HiChatAlt,
  HiStar,
  HiExternalLink,
  HiBookmark,
  HiOutlineBookmark,
  HiThumbUp,
  HiThumbDown,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggleSaveWebsite, voteWebsite } from "../slice/website.slice";
import type { Category } from "../../../types";

interface WebsiteCardProps {
  id: string;
  name: string;
  description: string;
  category: string | Category;
  upvotes: number;
  downvotes?: number;
  userVote?: "upvote" | "downvote" | null;
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
  downvotes = 0,
  userVote = null,
  rating,
  comments,
  url,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // We need to know if this website is saved.
  // Ideally, valid "savedWebsites" list should be in the store.
  // However, the `user` object from auth slice has `savedWebsites` array (of IDs).
  // Let's rely on that for quick check.

  // Note: user.savedWebsites might be array of strings or objects depending on population.
  // Usually in auth slice it is unpopulated or we need to check type.
  // Assuming it is array of strings (IDs).
  const isSaved = Array.isArray(user?.savedWebsites)
    ? user.savedWebsites.some(
        (savedItem: string | { _id: string }) =>
          (typeof savedItem === "string" ? savedItem : savedItem._id) === id
      )
    : false;

  console.log("WebsiteCard Debug:", {
    id,
    isSaved,
    savedWebsites: user?.savedWebsites,
  });

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      // Redirect to login or show toast (not implemented here)
      return;
    }
    dispatch(toggleSaveWebsite(id));
  };

  const handleVote = (e: React.MouseEvent, type: "upvote" | "downvote") => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    dispatch(voteWebsite({ id, voteType: type }));
  };

  return (
    <div className="group bg-white rounded-2xl border border-(--color-secondary)/30 hover:border-quaternary/40 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 p-5 relative">
      {/* Bookmark Button */}
      <button
        onClick={handleToggleSave}
        className={`absolute top-5 right-5 p-2 rounded-full transition-all z-10 ${
          isSaved
            ? "text-(--color-tertiary) bg-(--color-tertiary)/10 shadow-sm"
            : "text-(--color-quinary)/30 hover:text-(--color-tertiary) hover:bg-(--color-tertiary)/10"
        }`}
        title={isSaved ? "Remove from Saved" : "Save to Collection"}
      >
        {isSaved ? <HiBookmark size={20} /> : <HiOutlineBookmark size={20} />}
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pr-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-tertiary to-quaternary rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-bold text-(--color-sextary) group-hover:text-quaternary transition-colors line-clamp-1">
              <Link to={`/tool/${id}`}>{name}</Link>
            </h3>
            <span className="text-[10px] uppercase tracking-wider font-bold text-quaternary">
              {typeof category === "string"
                ? category
                : category?.name || "Resource"}
            </span>
          </div>
        </div>
      </div>

      {/* Rating Badge (Moved below header to avoid collision with bookmark) */}
      <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg text-xs font-bold text-quaternary w-fit mb-3">
        <HiStar className="text-(--color-tertiary)" />
        {rating.toFixed(1)}
      </div>

      {/* Description */}
      <p className="text-sm text-(--color-quinary)/70 line-clamp-2 leading-relaxed mb-4 min-h-[40px]">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-(--color-secondary)/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-50 rounded-full px-1 py-0.5 border border-gray-100">
            {/* Upvote */}
            <button
              onClick={(e) => handleVote(e, "upvote")}
              className={`p-1.5 rounded-full transition-all flex items-center gap-1 ${
                userVote === "upvote"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
              title="Helpful"
            >
              {userVote === "upvote" ? (
                <HiThumbUp size={14} />
              ) : (
                <HiOutlineThumbUp size={14} />
              )}
              <span className="text-[10px] font-bold">{upvotes}</span>
            </button>

            <div className="w-px h-3 bg-gray-200 mx-0.5" />

            {/* Downvote */}
            <button
              onClick={(e) => handleVote(e, "downvote")}
              className={`p-1.5 rounded-full transition-all flex items-center gap-1 ${
                userVote === "downvote"
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
              title="Not Helpful"
            >
              {userVote === "downvote" ? (
                <HiThumbDown size={14} />
              ) : (
                <HiOutlineThumbDown size={14} />
              )}
              <span className="text-[10px] font-bold">{downvotes}</span>
            </button>
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
