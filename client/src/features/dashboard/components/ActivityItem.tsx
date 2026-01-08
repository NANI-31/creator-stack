import React from "react";
import {
  HiOutlineChatAlt2,
  HiOutlineThumbUp,
  HiOutlineSave,
} from "react-icons/hi";

interface ActivityItemProps {
  type: "vote" | "comment" | "save";
  user: string;
  target: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  user,
  target,
  time,
}) => {
  const icons = {
    vote: {
      icon: HiOutlineThumbUp,
      bg: "bg-green-50",
      color: "text-green-500",
      text: "upvoted",
    },
    comment: {
      icon: HiOutlineChatAlt2,
      bg: "bg-blue-50",
      color: "text-blue-500",
      text: "commented on",
    },
    save: {
      icon: HiOutlineSave,
      bg: "bg-purple-50",
      color: "text-purple-500",
      text: "saved",
    },
  };

  const config = icons[type];

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-(--color-secondary)/10 rounded-2xl transition-colors group">
      <div
        className={`w-10 h-10 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}
      >
        <config.icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-(--color-quinary)">
          <span className="font-black text-(--color-sextary)">{user}</span>{" "}
          {config.text}{" "}
          <span className="font-black text-quaternary cursor-pointer hover:underline">
            {target}
          </span>
        </p>
        <p className="text-[10px] font-bold text-(--color-quinary)/40 uppercase tracking-widest mt-1">
          {time}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
