import React, { useState, useEffect } from "react";
import { adminApi, type ReportParams } from "../services/admin.service";

// Types
import type {
  Report,
  ReportStatus,
  ReportType,
} from "../components/Reports/types";

// Modular Components
import ReportsHeader from "../components/Reports/ReportsHeader";
import ReportsFilters from "../components/Reports/ReportsFilters";
import ReportsPane from "../components/Reports/ReportsPane";
import ReportDetailPane from "../components/Reports/ReportDetailPane";

const ReportsManager: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReportStatus>("Pending");
  const [filterType, setFilterType] = useState<ReportType>("All");

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params: ReportParams = {};
      if (filterStatus !== "All") params.status = filterStatus;
      if (filterType !== "All") params.type = filterType;

      const { data } = await adminApi.getReports(params);
      const mappedReports = data.data.map((r: any) => ({
        id: r._id,
        type: r.type,
        targetId: r.targetId,
        targetName: r.targetName,
        targetPreview: r.targetPreview,
        reporter: r.reporter?.username || "Unknown",
        reason: r.reason,
        severity: r.severity,
        status: r.status,
        timestamp: r.createdAt,
      }));
      setReports(mappedReports);
    } catch (error) {
      console.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filterStatus, filterType]);

  const selectedReport = reports.find((r) => r.id === selectedReportId);

  const handleAction = async (action: string) => {
    if (!selectedReportId) return;
    try {
      await adminApi.updateReportStatus(
        selectedReportId,
        "Resolved",
        `Action taken: ${action}`
      );
      fetchReports();
      setSelectedReportId(null);
    } catch (error) {
      console.error("Failed to update report");
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      <ReportsHeader
        pendingCount={reports.filter((r) => r.status === "Pending").length}
      />

      <ReportsFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        <ReportsPane
          reports={reports}
          selectedReportId={selectedReportId}
          setSelectedReportId={setSelectedReportId}
          isVisible={!selectedReport}
        />

        <ReportDetailPane
          report={selectedReport || null}
          onClose={() => setSelectedReportId(null)}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default ReportsManager;
