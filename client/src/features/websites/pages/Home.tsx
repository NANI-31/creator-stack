import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import ToolCard from "../components/ToolCard";
import Button from "../../../components/ui/Button";
import { HiFire, HiSparkles, HiStar } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTrendingWebsites, fetchCategories } from "../slice/website.slice";
import type { Website } from "../../../types";
import LoginPromptModal from "../../auth/components/LoginPromptModal";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trending, isLoading } = useAppSelector((state) => state.websites);
  const { user } = useAppSelector((state) => state.auth);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTrendingWebsites());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmitClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsLoginPromptOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-(--color-primary)">
      <main className="grow">
        <Hero />

        <CategoryGrid />

        {/* Trending Section */}
        <section className="py-20 bg-(--color-primary)/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-orange-100 text-(--color-tertiary) rounded-2xl flex items-center justify-center shadow-sm">
                <HiFire size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-(--color-sextary)">
                  Trending Websites
                </h2>
                <p className="text-sm font-bold text-(--color-quinary)/50 uppercase tracking-widest">
                  Popular this week
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-96 bg-(--color-secondary)/20 animate-pulse rounded-[2.5rem]"
                      />
                    ))
                : trending.map((tool: Website) => (
                    <ToolCard
                      key={tool._id}
                      id={tool._id}
                      name={tool.name}
                      description={tool.description}
                      category={tool.category}
                      thumbnail={tool.thumbnail}
                      upvotes={tool.stats.upvotes}
                      rating={tool.stats.rating}
                      comments={tool.stats.comments || 0}
                    />
                  ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/websites">
                <Button variant="outline" className="px-10!">
                  View All Trending
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center shadow-sm">
                <HiSparkles size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-(--color-sextary)">
                  Recently Added
                </h2>
                <p className="text-sm font-bold text-(--color-quinary)/50 uppercase tracking-widest">
                  Fresh from the community
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-96 bg-(--color-secondary)/20 animate-pulse rounded-[2.5rem]"
                      />
                    ))
                : [...trending]
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 4)
                    .map((tool: Website) => (
                      <ToolCard
                        key={`recent-${tool._id}`}
                        id={tool._id}
                        name={tool.name}
                        description={tool.description}
                        category={tool.category}
                        thumbnail={tool.thumbnail}
                        upvotes={tool.stats.upvotes}
                        rating={tool.stats.rating}
                        comments={tool.stats.comments || 0}
                      />
                    ))}
            </div>
          </div>
        </section>

        {/* Top Rated */}
        <section className="py-20 bg-(--color-primary)/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-2xl flex items-center justify-center shadow-sm">
                <HiStar size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-(--color-sextary)">
                  Top Rated
                </h2>
                <p className="text-sm font-bold text-(--color-quinary)/50 uppercase tracking-widest">
                  Highest quality resources
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-96 bg-(--color-secondary)/20 animate-pulse rounded-[2.5rem]"
                      />
                    ))
                : [...trending]
                    .sort(
                      (a, b) => (b.stats?.rating || 0) - (a.stats?.rating || 0)
                    )
                    .slice(0, 4)
                    .map((tool: Website) => (
                      <ToolCard
                        key={`top-${tool._id}`}
                        id={tool._id}
                        name={tool.name}
                        description={tool.description}
                        category={tool.category}
                        thumbnail={tool.thumbnail}
                        upvotes={tool.stats.upvotes}
                        rating={tool.stats.rating}
                        comments={tool.stats.comments || 0}
                      />
                    ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-linear-to-br from-tertiary to-quaternary rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Know a website others <br /> should discover?
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                  Contributors are the heart of CreatorStack. Share your
                  favorite tools and get credit for your discoveries.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/submit" onClick={handleSubmitClick}>
                    <Button
                      variant="secondary"
                      className="bg-white! text-quaternary! px-10! py-4! font-bold"
                    >
                      Submit a Website
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="outline"
                      className="border-white! text-white! hover:bg-white/10! px-10! py-4!"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative background circle */}
              <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-black/10 rounded-full blur-2xl" />
            </div>
          </div>
        </section>
      </main>

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </div>
  );
};

export default Home;
