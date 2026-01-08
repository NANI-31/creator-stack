import React from "react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { type Report } from "./types";
import { getSeverityColor, getTypeIcon } from "./utils";

interface ReportsPaneProps {
  reports: Report[];
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  isVisible: boolean;
}

const ReportsPane: React.FC<ReportsPaneProps> = ({
  reports,
  selectedReportId,
  setSelectedReportId,
  isVisible,
}) => {
  return (
    <div
      className={`flex-1 bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm overflow-hidden flex flex-col ${
        !isVisible ? "hidden lg:flex" : "flex"
      }`}
    >
      <div className="overflow-y-auto custom-scrollbar p-2 space-y-2 flex-1">
        {reports.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-(--color-quinary)/40">
            <HiOutlineShieldCheck size={48} className="mb-4 opacity-50" />
            <p className="font-bold">No reports found.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReportId(report.id)}
              className={`p-4 rounded-3xl border cursor-pointer transition-all group ${
                selectedReportId === report.id
                  ? "bg-(--color-primary)/10 border-quaternary shadow-inner"
                  : "bg-white border-transparent hover:border-(--color-secondary)/30 hover:shadow-md"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getSeverityColor(
                    report.severity
                  )}`}
                >
                  {report.severity} Priority
                </span>
                <span className="text-[10px] font-mono text-(--color-quinary)/40">
                  {new Date(report.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-2">
                <div className="p-3 rounded-2xl bg-(--color-primary)/20 text-sextary">
                  {getTypeIcon(report.type)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-(--color-sextary) line-clamp-1">
                    {report.targetName}
                  </h3>
                  <p className="text-xs text-(--color-quinary)/60 line-clamp-2">
                    {report.targetPreview}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-(--color-secondary)/10">
                <span className="text-[10px] font-bold text-(--color-quinary)/50 uppercase">
                  Reported for:
                </span>
                <span className="text-xs font-bold text-red-500">
                  {report.reason}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsPane;
