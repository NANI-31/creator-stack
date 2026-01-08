import React from "react";
import {
  HiCode,
  HiColorSwatch,
  HiVideoCamera,
  HiPhotograph,
  HiCubeTransparent,
  HiSparkles,
} from "react-icons/hi";
import { type IconType } from "react-icons";
import { IoArrowForward } from "react-icons/io5";
import { useAppSelector } from "../../../../app/hooks";
import type { Category } from "../../../../types";

const ICON_MAP: Record<string, IconType> = {
  HiCode,
  HiColorSwatch,
  HiVideoCamera,
  HiPhotograph,
  HiSparkles,
  HiCubeTransparent,
};

const CategoryGrid: React.FC = () => {
  const { categories } = useAppSelector((state) => state.websites);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-black text-(--color-sextary) mb-4">
              Browse by Interest
            </h2>
            <p className="text-(--color-quinary)/70 max-w-md font-medium">
              Quickly discover resources tailored to your specific creative
              profession.
            </p>
          </div>
          <button className="text-sm font-bold text-quaternary flex items-center gap-2 hover:gap-3 transition-all">
            View All Categories <IoArrowForward />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat: Category, i: number) => {
            const Icon = ICON_MAP[cat.icon] || HiSparkles;
            return (
              <div
                key={cat._id || i}
                className="group cursor-pointer bg-(--color-primary)/20 hover:bg-white rounded-2xl p-6 border border-transparent hover:border-(--color-secondary)/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div
                  className={`w-12 h-12 ${
                    cat.color || "bg-orange-500"
                  } rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-(--color-sextary) text-sm mb-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-(--color-quinary)/40">
                  {cat.websiteCount || 0} Websites
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
