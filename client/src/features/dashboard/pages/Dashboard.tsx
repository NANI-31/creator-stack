import React, { useEffect } from "react";
import StatCard from "../components/StatCard";
import ActivityItem from "../components/ActivityItem";
import Button from "../../../components/ui/Button";
import {
  HiOutlineGlobeAlt,
  HiOutlineThumbUp,
  HiOutlineChatAlt2,
  HiOutlineStar,
  HiOutlinePlusCircle,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchDashboardData } from "../../websites/slice/website.slice";
import type { Website } from "../../../types";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userStats, myContributions, isLoading } = useAppSelector(
    (state) => state.websites
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const stats = userStats || {
    contributed: 0,
    upvotes: 0,
    comments: 0,
    rating: 0,
  };
  return (
    <div className="animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-(--color-sextary) mb-2">
            Welcome back, {user?.fullName || "Creator"}! 👋
          </h1>
          <p className="text-(--color-quinary)/70 font-medium">
            Discover, contribute, and track useful websites for your stack.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="px-6! shadow-lg shadow-orange-500/20"
          >
            <HiOutlinePlusCircle size={20} /> Submit Website
          </Button>
          <Button variant="outline" className="px-6!">
            <HiOutlineTrendingUp size={20} /> Explore Trending
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Contributed"
          value={stats.contributed.toString()}
          icon={HiOutlineGlobeAlt}
          color="bg-blue-500"
        />
        <StatCard
          label="Upvotes Rec"
          value={stats.upvotes.toString()}
          icon={HiOutlineThumbUp}
          color="bg-green-500"
        />
        <StatCard
          label="Comments"
          value={stats.comments.toString()}
          icon={HiOutlineChatAlt2}
          color="bg-purple-500"
        />
        <StatCard
          label="Avg Rating"
          value={stats.rating.toString()}
          icon={HiOutlineStar}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contributions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-(--color-secondary)/30 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-(--color-sextary)">
                My Recent Contributions
              </h2>
              <button className="text-sm font-bold text-quaternary hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-24 bg-(--color-primary)/10 animate-pulse rounded-3xl"
                    />
                  ))
              ) : myContributions.length > 0 ? (
                myContributions.map((tool: Website) => (
                  <div
                    key={tool._id}
                    className="flex items-center gap-4 p-5 bg-(--color-primary)/20 rounded-3xl border border-transparent hover:border-(--color-secondary)/40 transition-all group"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-quaternary font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-(--color-sextary)">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-(--color-quinary)/60 truncate max-w-xs">
                        {tool.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${
                          tool.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {tool.status}
                      </span>
                      <div className="flex items-center gap-3 text-xs font-bold text-(--color-quinary)/40">
                        <span className="flex items-center gap-1">
                          <HiOutlineThumbUp /> {tool.stats?.upvotes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiOutlineStar /> {tool.stats?.rating || 0}
                        </span>
                      </div>
                    </div>
                    <div className="pl-4 border-l border-(--color-secondary)/40 flex flex-col gap-2">
                      <button className="text-xs font-bold text-quaternary hover:underline">
                        Edit
                      </button>
                      <button className="text-xs font-bold text-(--color-quinary)/60 hover:text-(--color-sextary)">
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-quinary/50 font-bold">
                  No contributions yet. Start sharing!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] border border-(--color-secondary)/30 p-8 shadow-sm h-full">
            <h2 className="text-xl font-black text-(--color-sextary) mb-8">
              Recent Activity
            </h2>
            <div className="space-y-2">
              <ActivityItem
                type="vote"
                user="Sarah Connor"
                target="Excalidraw"
                time="2 hours ago"
              />
              <ActivityItem
                type="comment"
                user="Alex Rivera"
                target="Ray.so"
                time="5 hours ago"
              />
              <ActivityItem
                type="save"
                user="John Doe"
                target="Pexels"
                time="1 day ago"
              />
              <ActivityItem
                type="comment"
                user="Mike D."
                target="Excalidraw"
                time="2 days ago"
              />
            </div>
            <button className="w-full mt-8 py-4 bg-(--color-secondary)/20 rounded-2xl text-sm font-bold text-(--color-quinary)/60 hover:bg-(--color-secondary)/30 hover:text-(--color-sextary) transition-all">
              Load More Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
