import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { User, Category } from "../../../types";
import {
  HiOutlineGlobeAlt,
  HiOutlineTag,
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineStar,
  HiCheckCircle,
  HiLightningBolt,
  HiOutlineInformationCircle,
  HiOutlineShare,
  HiOutlineShieldCheck,
  HiArrowLeft,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchWebsiteDetails } from "../slice/website.slice";
import Button from "../../../components/ui/Button";
import { formatDistanceToNow } from "date-fns";
import CommentList from "../../comments/CommentList";

const ToolDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentWebsite, isLoading, error } = useAppSelector(
    (state) => state.websites
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchWebsiteDetails(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-tertiary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-quaternary animate-pulse">
            Loading tool details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !currentWebsite) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-500">
          <HiOutlineInformationCircle size={32} />
        </div>
        <h2 className="text-xl font-black text-secondary">Tool not found</h2>
        <p className="text-quaternary/60 font-medium">
          The tool you are looking for specific details doesn't exist or was
          removed.
        </p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Dynamic Background Blur */}
      <div className="absolute top-0 left-0 w-full h-125 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-150 h-150 bg-tertiary/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-quaternary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-quinary/60 hover:text-quaternary transition-colors mb-8 group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Resources
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-quaternary shadow-sm">
                  {(currentWebsite.category as Category)?.name || "Resource"}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100">
                  <HiCheckCircle size={14} />
                  Verified Tool
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-sextary tracking-tight leading-[1.1]">
                {currentWebsite.name}
              </h1>

              <p className="text-lg md:text-xl font-medium text-quinary/70 leading-relaxed max-w-2xl">
                {currentWebsite.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {currentWebsite.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white border border-secondary/10 rounded-xl text-xs font-bold text-quinary/80 flex items-center gap-1.5 shadow-xs hover:border-tertiary/30 transition-colors cursor-default"
                >
                  <HiOutlineTag className="text-tertiary" size={14} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-secondary/10 shadow-sm w-fit pr-8">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-tertiary to-quaternary p-0.5 shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                  {(currentWebsite.author as User)?.avatar ? (
                    <img
                      src={(currentWebsite.author as User).avatar}
                      alt="Author"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-black text-quaternary">
                      {(currentWebsite.author as User)?.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-quinary/40 uppercase tracking-wider">
                  Submitted by
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-sextary">
                    {(currentWebsite.author as User)?.fullName || "Anonymous"}
                  </span>
                  <HiOutlineShieldCheck
                    className="text-blue-500"
                    size={16}
                    title="Trusted Contributor"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons (Mobile) */}
            <div className="lg:hidden flex flex-col gap-4">
              <a
                href={currentWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  fullWidth
                  className="py-4! text-base! shadow-xl shadow-orange-500/20"
                >
                  <HiOutlineGlobeAlt size={20} />
                  Visit Website
                </Button>
              </a>
              <div className="flex gap-4">
                <Button variant="outline" fullWidth>
                  <HiOutlineHeart size={20} />
                  Upvote
                </Button>
                <Button variant="outline" fullWidth>
                  <HiOutlineShare size={20} />
                  Share
                </Button>
              </div>
            </div>

            {/* Comment Section */}
            <div className="pt-12 border-t border-secondary/5 mt-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-secondary/5">
              <CommentList
                websiteId={currentWebsite._id}
                websiteAuthorId={
                  typeof currentWebsite.author === "string"
                    ? currentWebsite.author
                    : (currentWebsite.author as User)?._id
                }
              />
            </div>
          </div>

          {/* Right Sidebar / Sticky Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              {/* Main Card */}
              <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-gray-200/50 border border-secondary/10 overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-tertiary/5 rounded-full blur-3xl" />

                {/* Thumbnail */}
                <div className="aspect-video w-full rounded-3xl bg-gray-100 mb-6 overflow-hidden border border-secondary/10 relative group">
                  {currentWebsite.thumbnail ? (
                    <img
                      src={currentWebsite.thumbnail}
                      alt={currentWebsite.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-quaternary/20">
                      <HiLightningBolt size={48} />
                    </div>
                  )}

                  {/* Overlay CTA */}
                  <a
                    href={currentWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  >
                    <span className="px-5 py-2.5 bg-white rounded-full text-xs font-black text-quaternary shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                      Open Website
                    </span>
                  </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-secondary/5 text-center group hover:bg-orange-50/50 transition-colors">
                    <div className="flex items-center justify-center gap-1.5 text-tertiary mb-1">
                      <HiOutlineHeart
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-xl font-black text-sextary">
                      {currentWebsite.stats?.upvotes || 0}
                    </p>
                    <p className="text-[10px] font-bold text-quinary/40 uppercase tracking-widest">
                      Upvotes
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-secondary/5 text-center group hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center justify-center gap-1.5 text-blue-500 mb-1">
                      <HiOutlineStar
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-xl font-black text-sextary">
                      {currentWebsite.stats?.rating || "0.0"}
                    </p>
                    <p className="text-[10px] font-bold text-quinary/40 uppercase tracking-widest">
                      Rating
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-secondary/5 text-center group hover:bg-purple-50/50 transition-colors">
                    <div className="flex items-center justify-center gap-1.5 text-purple-500 mb-1">
                      <HiOutlineChat
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-xl font-black text-sextary">
                      {currentWebsite.stats?.commentCount || 0}
                    </p>
                    <p className="text-[10px] font-bold text-quinary/40 uppercase tracking-widest">
                      Comments
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-secondary/5 text-center group hover:bg-green-50/50 transition-colors">
                    <div className="flex items-center justify-center gap-1.5 text-green-500 mb-1">
                      <HiCheckCircle
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-xl font-black text-sextary">
                      {formatDistanceToNow(
                        new Date(currentWebsite.createdAt)
                      ).replace("about ", "")}
                    </p>
                    <p className="text-[10px] font-bold text-quinary/40 uppercase tracking-widest">
                      Age
                    </p>
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="space-y-3">
                  <a
                    href={currentWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="primary"
                      fullWidth
                      className="py-4! text-base! shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all w-full"
                    >
                      <HiOutlineGlobeAlt size={20} />
                      Visit Website
                    </Button>
                  </a>

                  <div className="flex gap-3">
                    <button className="flex-1 py-3 items-center justify-center flex gap-2 text-xs font-bold text-quinary/70 bg-white border-2 border-secondary/10 rounded-xl hover:border-tertiary hover:text-tertiary transition-all">
                      <HiOutlineHeart size={16} />
                      Save
                    </button>
                    <button className="flex-1 py-3 items-center justify-center flex gap-2 text-xs font-bold text-quinary/70 bg-white border-2 border-secondary/10 rounded-xl hover:border-quaternary hover:text-quaternary transition-all">
                      <HiOutlineShare size={16} />
                      Share
                    </button>
                  </div>
                </div>

                {/* Meta Footer */}
                <div className="mt-6 pt-6 border-t border-secondary/10 text-center">
                  <p className="text-[10px] text-quinary/40">
                    IDs: {currentWebsite._id} • Report an issue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetails;
