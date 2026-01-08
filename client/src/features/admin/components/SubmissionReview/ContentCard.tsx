import React from "react";
import {
  HiOutlineExternalLink,
  HiOutlineCurrencyDollar,
  HiOutlineTag,
} from "react-icons/hi";
import type { Submission } from "./types";

interface ContentCardProps {
  submission: Submission;
}

const ContentCard: React.FC<ContentCardProps> = ({ submission }) => {
  return (
    <div className="bg-white p-8 rounded-4xl border border-(--color-secondary)/30 shadow-sm space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl border border-(--color-secondary)/20 bg-(--color-primary)/20 flex items-center justify-center p-3 shadow-inner">
            <img
              src={submission.favicon}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-(--color-sextary) tracking-tight mb-2">
              {submission.name}
            </h2>
            <a
              href={submission.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-quaternary font-bold hover:underline"
            >
              {submission.url} <HiOutlineExternalLink />
            </a>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="inline-block px-4 py-2 bg-(--color-primary)/30 rounded-xl text-xs font-black text-(--color-sextary) uppercase tracking-wide mb-2">
            {submission.category}
          </span>
          <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-(--color-quinary)/50 uppercase tracking-widest">
            <HiOutlineCurrencyDollar size={14} className="text-green-500" />
            {submission.pricing}
          </div>
        </div>
      </div>

      <div className="h-px bg-(--color-secondary)/10 w-full" />

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em]">
          Short Description
        </h3>
        <p className="text-base text-(--color-quinary)/80 font-medium leading-relaxed bg-(--color-primary)/10 p-4 rounded-2xl border border-(--color-secondary)/5">
          {submission.description}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em]">
          Detailed Overview
        </h3>
        <p className="text-sm text-(--color-quinary)/70 font-medium leading-relaxed whitespace-pre-wrap">
          {submission.fullDescription}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {submission.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-(--color-primary)/20 border border-(--color-secondary)/10 rounded-lg text-[10px] font-bold text-(--color-sextary) flex items-center gap-1"
          >
            <HiOutlineTag size={12} className="opacity-50" /> {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContentCard;
