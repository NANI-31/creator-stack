import React from "react";
import {
  HiOutlineX,
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineTrash,
  HiOutlineBan,
} from "react-icons/hi";
import { type Report } from "./types";
import { getTypeIcon } from "./utils";

interface ReportDetailPaneProps {
  report: Report | null;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ReportDetailPane: React.FC<ReportDetailPaneProps> = ({
  report,
  onClose,
  onAction,
}) => {
  return (
    <div
      className={`w-full lg:w-112.5 bg-white rounded-4xl border border-(--color-secondary)/30 shadow-xl flex flex-col ${
        !report ? "hidden lg:flex lg:opacity-50 lg:pointer-events-none" : "flex"
      }`}
    >
      {report ? (
        <>
          <div className="p-6 border-b border-(--color-secondary)/20 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-black text-(--color-sextary)">
                  {report.id}
                </h2>
                <span
                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    report.status === "Pending"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-xs font-medium text-(--color-quinary)/60">
                Reported by{" "}
                <span className="text-sextary font-bold">
                  {report.reporter}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 bg-gray-50 rounded-xl"
            >
              <HiOutlineX />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Reported Content Preview */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest">
                Reported Content
              </label>
              <div className="p-4 bg-(--color-primary)/10 rounded-2xl border border-(--color-secondary)/20">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-sextary">
                  {getTypeIcon(report.type)} {report.type}: {report.targetName}
                </div>
                <p className="text-sm text-(--color-sextary)/80 leading-relaxed font-medium">
                  "{report.targetPreview}"
                </p>
              </div>
            </div>

            {/* Analysis */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest">
                Details
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="block text-[10px] font-bold text-red-400 uppercase">
                    Reason
                  </span>
                  <span className="text-sm font-black text-red-600">
                    {report.reason}
                  </span>
                </div>
                <div className="p-3 bg-white border rounded-xl">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase">
                    Target ID
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-600">
                    {report.targetId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Toolbar */}
          <div className="p-6 border-t border-(--color-secondary)/20 bg-gray-50/50 rounded-b-4xl">
            {report.status === "Pending" ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onAction("Dismiss")}
                  className="col-span-1 p-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                >
                  Dismiss Report
                </button>
                <button
                  onClick={() => onAction("Resolve")}
                  className="col-span-1 p-3 rounded-xl bg-quaternary text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <HiOutlineCheck /> Resolve
                </button>

                <div className="col-span-2 pt-2 flex gap-2">
                  <button
                    onClick={() => onAction("Action: Delete")}
                    className="flex-1 p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <HiOutlineTrash /> Delete Content
                  </button>
                  <button
                    onClick={() => onAction("Action: Ban")}
                    className="flex-1 p-2 bg-gray-800 text-white border border-gray-800 rounded-lg text-xs font-bold hover:bg-black flex items-center justify-center gap-2"
                  >
                    <HiOutlineBan /> Ban User
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <HiOutlineCheck
                  className="mx-auto text-green-500 mb-2"
                  size={24}
                />
                <p className="text-xs font-bold text-green-700">
                  This report has been {report.status.toLowerCase()}.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 text-(--color-quinary)/40">
          <HiOutlineEye size={48} className="mb-4 opacity-50" />
          <h3 className="text-lg font-black text-(--color-sextary)/50">
            Select a Report
          </h3>
          <p className="text-sm">
            Choose a report from the list to view details and take action.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportDetailPane;
