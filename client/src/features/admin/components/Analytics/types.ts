import React from "react";

export interface KPIData {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface ContentItem {
  title: string;
  views: string;
  rating: number;
  category: string;
}

export interface CategoryData {
  name: string;
  count: number;
  color: string;
}
