import React, { useState, useEffect } from "react";
import {
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineStar,
} from "react-icons/hi";

// Types
import {
  type KPIData,
  type ChartData,
  type ContentItem,
  type CategoryData,
} from "../components/Analytics/types";

// Modular Components
import { adminApi } from "../services/admin.service";
import AnalyticsHeader from "../components/Analytics/AnalyticsHeader";
import KPIStats from "../components/Analytics/KPIStats";
import UserGrowthChart from "../components/Analytics/UserGrowthChart";
import CategoryDistribution from "../components/Analytics/CategoryDistribution";
import TopPerformingContent from "../components/Analytics/TopPerformingContent";

const AnalyticsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange] = useState("Last 30 Days");
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<ChartData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [topContent, setTopContent] = useState<ContentItem[]>([]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getAnalytics();
      const payload = data.data;

      // Map KPI
      setKpiData([
        {
          label: "Total Submissions",
          value: payload.kpis.totalSubmissions.value.toLocaleString(),
          trend: payload.kpis.totalSubmissions.trend,
          isPositive: payload.kpis.totalSubmissions.isPositive,
          icon: <HiOutlineGlobeAlt size={20} />,
          color: "text-blue-600 bg-blue-50",
        },
        {
          label: "Active Users",
          value: payload.kpis.activeUsers.value.toLocaleString(),
          trend: payload.kpis.activeUsers.trend,
          isPositive: payload.kpis.activeUsers.isPositive,
          icon: <HiOutlineUsers size={20} />,
          color: "text-purple-600 bg-purple-50",
        },
        {
          label: "Engagement Rate",
          value: `${payload.kpis.engagementRate.value}%`,
          trend: payload.kpis.engagementRate.trend,
          isPositive: payload.kpis.engagementRate.isPositive,
          icon: <HiOutlineGlobeAlt size={20} />,
          color: "text-green-600 bg-green-50",
        },
        {
          label: "Avg. Regulation",
          value: `${payload.kpis.avgRating.value}/5`,
          trend: payload.kpis.avgRating.trend,
          isPositive: payload.kpis.avgRating.isPositive,
          icon: <HiOutlineStar size={20} />,
          color: "text-orange-600 bg-orange-50",
        },
      ]);

      // Map Charts
      setUserGrowthData(payload.userGrowth);
      setCategoryData(payload.categoryDistribution);
      setTopContent(
        payload.topContent.map((c: any) => ({
          title: c.title,
          views: c.views.toLocaleString(),
          rating: c.rating,
          category: c.category,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 p-20">
        <div className="w-12 h-12 border-4 border-(--color-primary)/20 border-t-quaternary rounded-full animate-spin"></div>
        <p className="text-(--color-sextary) font-black animate-pulse">
          Analyzing stats...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <AnalyticsHeader dateRange={dateRange} />

      <KPIStats data={kpiData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserGrowthChart data={userGrowthData} />
        <CategoryDistribution data={categoryData} />
      </div>

      <TopPerformingContent data={topContent} />
    </div>
  );
};

export default AnalyticsDashboard;
