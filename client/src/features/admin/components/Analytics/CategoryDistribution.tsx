import React from "react";
import { type CategoryData } from "./types";

interface CategoryDistributionProps {
  data: CategoryData[];
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  data,
}) => {
  return (
    <div className="bg-white p-6 rounded-4xl border border-(--color-secondary)/20 shadow-sm">
      <h3 className="text-lg font-black text-(--color-sextary) mb-6">
        Categories
      </h3>
      <div className="space-y-6">
        {data.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-gray-600">{cat.name}</span>
              <span className="text-gray-400">{cat.count}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${cat.color}`}
                style={{ width: `${cat.count}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <p className="text-xs text-gray-500 font-medium">
          <strong className="text-gray-800">Insight:</strong> Development tools
          account for <strong className="text-blue-600">45%</strong> of all
          submissions this month.
        </p>
      </div>
    </div>
  );
};

export default CategoryDistribution;
