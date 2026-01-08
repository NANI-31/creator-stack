import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiOutlineRefresh,
  HiOutlineBookmark,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchSavedWebsites,
  fetchCategories,
} from "../../websites/slice/website.slice";
import WebsiteCard from "../../websites/components/WebsiteCard";
import Button from "../../../components/ui/Button";
import type { Website, Category } from "../../../types";

type SortOption = "trending" | "upvotes" | "rating" | "newest";

const SavedWebsites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { savedWebsites, categories, isLoading, error, totalSaved } =
    useAppSelector((state) => state.websites);

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    let sortQuery = "newest"; // default
    if (sortBy === "trending" || sortBy === "upvotes") sortQuery = "trending";
    if (sortBy === "rating") sortQuery = "top-rated";
    if (sortBy === "newest") sortQuery = "newest";

    dispatch(
      fetchSavedWebsites({
        page,
        limit: 12,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        sort: sortQuery,
      })
    );
  }, [dispatch, page, categoryFilter, sortBy]);

  const handleCategoryChange = (slug: string) => {
    setCategoryFilter(slug);
    setPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleRefresh = () => {
    setPage(1);
    let sortQuery = "newest";
    if (sortBy === "trending" || sortBy === "upvotes") sortQuery = "trending";
    if (sortBy === "rating") sortQuery = "top-rated";
    if (sortBy === "newest") sortQuery = "newest";

    dispatch(
      fetchSavedWebsites({
        page: 1,
        limit: 12,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        sort: sortQuery,
      })
    );
  };

  // Client-side search filtering (since API search might be efficient or not, but existing consistent with WebsiteListView)
  const filteredWebsites = React.useMemo(() => {
    if (!searchTerm) return savedWebsites;
    const term = searchTerm.toLowerCase();
    return savedWebsites.filter(
      (w) =>
        w.name.toLowerCase().includes(term) ||
        w.description.toLowerCase().includes(term)
    );
  }, [savedWebsites, searchTerm]);

  return (
    <div className="min-h-screen bg-(--color-primary) animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="bg-linear-to-b from-(--color-primary) to-white py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-quaternary/10 text-quaternary flex items-center justify-center">
              <HiOutlineBookmark size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-(--color-sextary)">
              Saved Collections
            </h1>
          </div>
          <p className="text-lg text-(--color-quinary)/70 max-w-2xl ml-16">
            Your personal library of tools and resources.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 pb-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-(--color-secondary)/30 p-4 md:p-6 shadow-sm mb-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <HiOutlineSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search your saved websites..."
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
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="pl-11 pr-8 py-3 bg-(--color-primary)/30 border border-transparent focus:border-quaternary/30 rounded-2xl outline-none text-sm font-bold text-(--color-sextary) appearance-none cursor-pointer transition-all min-w-40"
              >
                <option value="newest">Newest Saved</option>
                <option value="trending">Trending</option>
                <option value="upvotes">Most Upvoted</option>
                <option value="rating">Highest Rated</option>
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
                  onClick={() => handleCategoryChange("all")}
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
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      categoryFilter === cat.slug
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
            {filteredWebsites.length} saved website
            {filteredWebsites.length !== 1 ? "s" : ""} found
          </p>
          <Link
            to="/websites"
            className="text-sm font-bold text-quaternary hover:underline"
          >
            + Browse More
          </Link>
        </div>

        {/* Website Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading Skeletons
            Array(4)
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
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={handleRefresh}>
                Try Again
              </Button>
            </div>
          ) : filteredWebsites.length === 0 ? (
            // Empty State
            <div className="col-span-2 bg-white rounded-3xl border border-(--color-secondary)/30 p-16 text-center">
              <div className="w-16 h-16 bg-(--color-primary) rounded-2xl flex items-center justify-center text-quaternary/40 mx-auto mb-4">
                <HiOutlineBookmark size={32} />
              </div>
              <h3 className="text-xl font-black text-(--color-sextary) mb-2">
                No saved websites
              </h3>
              <p className="text-(--color-quinary)/60 mb-6">
                Start exploring and bookmark websites you want to keep handy.
              </p>
              <Link to="/websites">
                <Button variant="primary">Browse Websites</Button>
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
                downvotes={website.stats?.downvotes || 0}
                userVote={website.userVote}
                rating={website.stats?.rating || 0}
                comments={website.stats?.comments || 0}
                url={website.url}
              />
            ))
          )}
        </div>

        {/* Load More */}
        {!isLoading &&
          savedWebsites.length < totalSaved &&
          filteredWebsites.length > 0 && (
            <div className="mt-10 text-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-white border-2 border-(--color-secondary)/30 rounded-2xl text-sm font-bold text-(--color-quinary)/60 hover:border-quaternary hover:text-quaternary transition-all"
              >
                Load More Saved Items
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default SavedWebsites;
