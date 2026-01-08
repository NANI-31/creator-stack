import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiOutlineRefresh,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTrendingWebsites, fetchCategories } from "../slice/website.slice";
import WebsiteCard from "../components/WebsiteCard";
import Button from "../../../components/ui/Button";
import type { Website, Category } from "../../../types";

type SortOption = "trending" | "upvotes" | "rating" | "comments" | "newest";

const WebsiteListView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trending, categories, isLoading, error } = useAppSelector(
    (state) => state.websites
  );

  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchTrendingWebsites());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sort and filter websites
  const filteredWebsites = React.useMemo(() => {
    let result = [...trending];

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(term) ||
          w.description.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter((w) => {
        const catName =
          typeof w.category === "string"
            ? w.category
            : (w.category as Category)?.name;
        return catName?.toLowerCase() === categoryFilter.toLowerCase();
      });
    }

    // Sort
    switch (sortBy) {
      case "upvotes":
        result.sort(
          (a, b) => (b.stats?.upvotes || 0) - (a.stats?.upvotes || 0)
        );
        break;
      case "rating":
        result.sort((a, b) => (b.stats?.rating || 0) - (a.stats?.rating || 0));
        break;
      case "comments":
        result.sort(
          (a, b) =>
            (b.stats?.commentCount || b.stats?.comments || 0) -
            (a.stats?.commentCount || a.stats?.comments || 0)
        );
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // trending - keep original order
        break;
    }

    return result;
  }, [trending, sortBy, categoryFilter, searchTerm]);

  const handleRefresh = () => {
    dispatch(fetchTrendingWebsites());
  };

  return (
    <div className="min-h-screen bg-(--color-primary)">
      {/* Page Header */}
      <div className="bg-linear-to-b from-(--color-primary) to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-(--color-sextary) mb-4">
            Discover Useful Websites
          </h1>
          <p className="text-lg text-(--color-quinary)/70 max-w-2xl mx-auto">
            Handpicked tools the community finds valuable. Browse, vote, and
            share your favorites.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-(--color-secondary)/30 p-4 md:p-6 shadow-sm mb-8 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <HiOutlineSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search websites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-(--color-primary)/30 border border-transparent focus:border-quaternary/30 rounded-2xl outline-none text-sm font-medium text-(--color-sextary) transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <HiOutlineSortDescending
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/40"
                size={18}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-11 pr-8 py-3 bg-(--color-primary)/30 border border-transparent focus:border-quaternary/30 rounded-2xl outline-none text-sm font-bold text-(--color-sextary) appearance-none cursor-pointer transition-all min-w-40"
              >
                <option value="trending">Trending</option>
                <option value="upvotes">Most Upvoted</option>
                <option value="rating">Highest Rated</option>
                <option value="comments">Most Discussed</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                showFilters
                  ? "bg-quaternary text-white"
                  : "bg-(--color-primary)/30 text-(--color-quinary)/70 hover:bg-(--color-secondary)/40"
              }`}
            >
              <HiOutlineFilter size={18} />
              Filters
            </button>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="p-3 rounded-2xl bg-(--color-primary)/30 text-(--color-quinary)/60 hover:text-quaternary hover:bg-(--color-secondary)/40 transition-all"
              title="Refresh"
            >
              <HiOutlineRefresh size={20} />
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-(--color-secondary)/20 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    categoryFilter === "all"
                      ? "bg-quaternary text-white"
                      : "bg-(--color-primary)/50 text-(--color-quinary)/60 hover:bg-(--color-secondary)/40"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat: Category) => (
                  <button
                    key={cat._id}
                    onClick={() => setCategoryFilter(cat.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      categoryFilter === cat.name
                        ? "bg-quaternary text-white"
                        : "bg-(--color-primary)/50 text-(--color-quinary)/60 hover:bg-(--color-secondary)/40"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-(--color-quinary)/50">
            {filteredWebsites.length} website
            {filteredWebsites.length !== 1 ? "s" : ""} found
          </p>
          <Link
            to="/submit"
            className="text-sm font-bold text-quaternary hover:underline"
          >
            + Submit a Website
          </Link>
        </div>

        {/* Website Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            // Loading Skeletons
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-white rounded-[2.5rem] border border-(--color-secondary)/30 animate-pulse"
                />
              ))
          ) : error ? (
            // Error State
            <div className="col-span-2 bg-white rounded-3xl border border-red-200 p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4">
                <HiOutlineGlobeAlt size={32} />
              </div>
              <h3 className="text-xl font-black text-(--color-sextary) mb-2">
                Something went wrong
              </h3>
              <p className="text-(--color-quinary)/60 mb-6">{error}</p>
              <Button variant="outline" onClick={handleRefresh}>
                Try Again
              </Button>
            </div>
          ) : filteredWebsites.length === 0 ? (
            // Empty State
            <div className="col-span-2 bg-white rounded-3xl border border-(--color-secondary)/30 p-12 text-center">
              <div className="w-16 h-16 bg-(--color-primary) rounded-2xl flex items-center justify-center text-quaternary/40 mx-auto mb-4">
                <HiOutlineGlobeAlt size={32} />
              </div>
              <h3 className="text-xl font-black text-(--color-sextary) mb-2">
                No websites found
              </h3>
              <p className="text-(--color-quinary)/60 mb-6">
                {searchTerm || categoryFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Be the first to submit a website!"}
              </p>
              <Link to="/submit">
                <Button variant="primary">Submit a Website</Button>
              </Link>
            </div>
          ) : (
            // Website Grid
            filteredWebsites.map((website: Website) => (
              <WebsiteCard
                key={website._id}
                id={website._id}
                name={website.name}
                description={website.description}
                category={website.category}
                upvotes={website.stats?.upvotes || 0}
                rating={website.stats?.rating || 0}
                comments={website.stats?.comments || 0}
                url={website.url}
              />
            ))
          )}
        </div>

        {/* Load More */}
        {!isLoading && filteredWebsites.length > 0 && (
          <div className="mt-10 text-center">
            <button className="px-8 py-3 bg-white border-2 border-(--color-secondary)/30 rounded-2xl text-sm font-bold text-(--color-quinary)/60 hover:border-quaternary hover:text-quaternary transition-all">
              Load More Websites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteListView;
