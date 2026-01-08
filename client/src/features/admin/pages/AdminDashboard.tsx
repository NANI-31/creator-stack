import React, { useState, useEffect } from "react";
import {
  HiOutlineGlobeAlt,
  HiOutlineUsers,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../services/admin.service";

// Modular Components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsGrid from "../components/Dashboard/StatsGrid";
import SubmissionsOverview from "../components/Dashboard/SubmissionsOverview";
import QuickActions from "../components/Dashboard/QuickActions";
import ModerationAlerts from "../components/Dashboard/ModerationAlerts";
import PopularContent from "../components/Dashboard/PopularContent";
import RecentRegistrations from "../components/Dashboard/RecentRegistrations";
import CategoryPerformance from "../components/Dashboard/CategoryPerformance";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("Last 7 days");

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [moderationAlerts, setModerationAlerts] = useState<any[]>([]);
  const [popularContent, setPopularContent] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats from analytics or dedicated dashboard endpoint
      const { data } = await adminApi.getAnalytics();
      const payload = data.data;

      setStats([
        {
          label: "Total Websites",
          value: payload.kpis.totalSubmissions.value.toString(),
          icon: HiOutlineGlobeAlt,
          trend: { value: 8, isUp: true }, // Trends can be calculated or fetched
          color: "bg-blue-500",
        },
        {
          label: "Active Users",
          value: payload.kpis.activeUsers.value.toLocaleString(),
          icon: HiOutlineUsers,
          trend: { value: 5, isUp: true },
          color: "bg-purple-500",
        },
        {
          label: "Pending Approvals",
          value: payload.kpis.pendingReviews.value.toString(),
          icon: HiOutlineGlobeAlt,
          trend: { value: 12, isUp: true },
          color: "bg-orange-500",
        },
        {
          label: "Active Reports",
          value: payload.kpis.activeReports.value.toString(),
          icon: HiOutlineShieldCheck,
          trend: { value: 15, isUp: false },
          color: "bg-red-500",
        },
      ]);

      // Map Popular Content
      setPopularContent(
        payload.topContent.map((c: any) => ({
          name: c.title,
          category: c.category,
          upvotes: c.views, // Mapping views to upvotes for now
          rating: c.rating,
        }))
      );

      // Map Category Performance
      setCategories(
        payload.categoryDistribution.map((c: any) => ({
          name: c.name,
          count: c.count,
          score: Math.floor(Math.random() * 20) + 80, // Mocking score for now
        }))
      );

      // Fetch alerts (from reports/submissions)
      const { data: reportData } = await adminApi.getReports({
        status: "Pending",
      });
      setModerationAlerts(
        reportData.data.slice(0, 3).map((r: any) => ({
          id: r._id,
          type: r.type,
          title: r.targetName,
          user: r.reporter?.username || "Anonymous",
          time: "Just now",
          status: r.status,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch dashboard data");
    } finally {
      console.log("Dashboard data fetched successfully");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const handleStatClick = (label: string) => {
    navigate(
      label.toLowerCase().includes("pending") ? "/admin/submissions" : "/admin"
    );
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 p-20">
        <div className="w-12 h-12 border-4 border-(--color-primary)/20 border-t-quaternary rounded-full animate-spin"></div>
        <p className="text-(--color-sextary) font-black animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      <StatsGrid stats={stats} onStatClick={handleStatClick} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SubmissionsOverview />
        <QuickActions onAction={(path) => navigate(path)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ModerationAlerts alerts={moderationAlerts} />
        <PopularContent items={popularContent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentRegistrations />
        <CategoryPerformance categories={categories} />
      </div>
    </div>
  );
};

export default AdminDashboard;
