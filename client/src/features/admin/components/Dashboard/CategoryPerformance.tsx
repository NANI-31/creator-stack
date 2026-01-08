import React from "react";

interface Category {
  name: string;
  count: number;
  score: number;
}

interface CategoryPerformanceProps {
  categories: Category[];
}

const CategoryPerformance: React.FC<CategoryPerformanceProps> = ({
  categories,
}) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-(--color-sextary)">
          Category Health
        </h2>
        <span className="text-[10px] font-bold text-(--color-quinary)/40 uppercase tracking-widest">
          Websites vs Score
        </span>
      </div>
      <div className="space-y-5">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-(--color-sextary)">
                {cat.name}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-(--color-quinary)/40 uppercase tracking-widest">
                  {cat.count} sites
                </span>
                <span className="text-xs font-black text-quaternary">
                  {cat.score}%
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-(--color-primary) rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-tertiary to-quaternary transition-all duration-1000"
                style={{ width: `${cat.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPerformance;
