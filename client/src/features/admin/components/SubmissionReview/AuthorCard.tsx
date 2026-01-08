import React from "react";
import type { SubmissionAuthor } from "./types";

interface AuthorCardProps {
  author: SubmissionAuthor;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="bg-white p-6 rounded-4xl border border-(--color-secondary)/30 shadow-sm flex flex-col h-full">
      <h3 className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em] mb-6">
        Submitted By
      </h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden">
          <img
            src={author.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-black text-(--color-sextary)">
            @{author.username}
          </p>
          <p className="text-xs text-(--color-quinary)/50 font-medium">
            Member since {new Date(author.joinDate).getFullYear()}
          </p>
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-4">
        <div className="bg-(--color-primary)/20 p-3 rounded-xl text-center">
          <p className="text-lg font-black text-quaternary">
            {author.reputation}
          </p>
          <p className="text-[9px] font-bold text-(--color-quinary)/40 uppercase">
            Reputation
          </p>
        </div>
        <div className="bg-(--color-primary)/20 p-3 rounded-xl text-center">
          <p className="text-lg font-black text-(--color-sextary)">
            {author.totalSubmissions}
          </p>
          <p className="text-[9px] font-bold text-(--color-quinary)/40 uppercase">
            Submissions
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
