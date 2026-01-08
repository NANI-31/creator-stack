import React, { useState, useEffect, useCallback } from "react";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineGlobeAlt,
  HiOutlineStar,
  HiOutlineThumbUp,
  HiOutlineDotsVertical,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import { adminApi, type SubmissionParams } from "../services/admin.service";
import Spinner from "../../../components/ui/Spinner";

// ... (Submisison interface remains same, but maybe need to match API response)
// API returns: _id, name, url, category (obj), author (obj), stats (obj), status, createdAt, description
interface Submission {
  _id: string;
  name: string;
  url: string;
  category: { _id: string; name: string };
  author: { _id: string; username: string; avatar?: string };
  stats: { upvotes: number; rating: number };
  createdAt: string;
  status: "Pending" | "Approved" | "Rejected";
  description: string;
  favicon?: string;
}

const SubmissionsManager: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "Pending" | "Approved" | "Rejected" | "All"
  >("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(
    async (isInitial = false) => {
      try {
        if (isInitial) setLoading(true);
        const params: SubmissionParams = {};
        if (activeTab !== "All") params.status = activeTab;

        const { data } = await adminApi.getSubmissions(params);
        setSubmissions(data.data);
      } catch (error: any) {
        toast.error(
          (error as any).response?.data?.message ||
            "Failed to fetch submissions"
        );
      } finally {
        if (isInitial) setLoading(false);
      }
    },
    [activeTab]
  );

  // Fetch logic
  useEffect(() => {
    fetchSubmissions(true);
  }, [activeTab, fetchSubmissions]);

  // Stats calculation matches backend logic mostly, but we are fetching paginated/filtered data?
  // Actually getAllSubmissions returns all matching the filter.
  // For the tabs count to be accurate "stats", we ideally need a separate stats endpoint or
  // we need to fetch "All" and then filter client side.
  // Given the UI design shows counts on tabs, let's stick to client-side filtering for small datasets
  // OR fetch stats separately.
  // The current UI switches tabs which triggers fetch. The counts might be inaccurate if we only fetch "Pending".
  // Let's modify logic: Fetch ALL on mount (or if search changes) and filter client side?
  // OR keep server side filtering.
  // IF we keep server side filtering, we lose the counts on other tabs unless we fetch counts.

  // Let's stick to the current backend implementation: getAllSubmissions returns array.
  // We can fetch "All" initially? No, that might be too much data.
  // For now, let's just fetch based on tab and maybe hide the specific counts if they are not available,
  // or just show (0) if not loaded.

  // Actually, let's fetch based on 'status' effectively.

  // Filtered submissions is now just 'submissions' because we filter on server?
  // OR if we do client side filtering:
  // Let's try to fetch filtered data from server to be scalable.

  // But wait, the previous code had client filtering:
  /*
  const filteredSubmissions = submissions.filter((s) => {
    const matchesTab = activeTab === "All" || s.status === activeTab;
    // ...
  });
  */

  // If we fetch purely by tab from server, 'submissions' will only contain that tab's data.
  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Correction for table rendering:
  // We need to map the API data structure to the table cells correctly.

  const toggleSelectAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(filteredSubmissions.map((s) => s._id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateStatus = async (
    id: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      const loadingToast = toast.loading(
        `${status === "Approved" ? "Approving" : "Rejecting"} submission...`
      );
      await adminApi.updateSubmissionStatus(id, status);
      toast.dismiss(loadingToast);
      toast.success(`Submission ${status.toLowerCase()} successfully`);
      fetchSubmissions(); // Refresh list
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${status.toLowerCase()} submission`
      );
    }
  };

  const handleBulkAction = async (status: "Approved" | "Rejected") => {
    if (selectedSubmissions.length === 0) return;

    const confirmMessage = `Are you sure you want to ${status.toLowerCase()} ${
      selectedSubmissions.length
    } selected submissions?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      const loadingToast = toast.loading(
        `${status === "Approved" ? "Approving" : "Rejecting"} ${
          selectedSubmissions.length
        } items...`
      );

      // Since backend doesn't have bulk endpoint, we loop
      // Better would be a bulk endpoint, but we stick to what we have
      await Promise.all(
        selectedSubmissions.map((id) =>
          adminApi.updateSubmissionStatus(id, status)
        )
      );

      toast.dismiss(loadingToast);
      toast.success(
        `${
          selectedSubmissions.length
        } submissions ${status.toLowerCase()} successfully`
      );
      setSelectedSubmissions([]);
      fetchSubmissions();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          `Failed to process bulk ${status.toLowerCase()}`
      );
      fetchSubmissions(); // Refresh anyway to see partial success if any
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Spinner />
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
            Website Submissions
          </h1>
          <p className="text-(--color-quinary)/60 font-medium">
            Review and manage user-submitted content efficiently.
          </p>
        </div>

        <div className="bg-white border border-(--color-secondary)/30 rounded-2xl p-1 shadow-sm flex items-center overflow-x-auto no-scrollbar">
          {(["Pending", "Approved", "Rejected", "All"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap
                ${
                  activeTab === tab
                    ? "bg-quaternary text-white shadow-lg shadow-orange-500/20"
                    : "text-(--color-quinary)/40 hover:text-(--color-sextary)"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-(--color-secondary)/30 shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md group">
            <HiOutlineSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/30 group-focus-within:text-quaternary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, URL or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-(--color-primary)/20 border-transparent border focus:border-quaternary/20 focus:bg-white rounded-2xl outline-none text-sm font-medium transition-all"
            />
          </div>
          <button className="p-3 bg-white border border-(--color-secondary)/30 rounded-2xl text-(--color-quinary)/50 hover:text-quaternary hover:border-quaternary/30 transition-all shadow-sm">
            <HiOutlineFilter size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {selectedSubmissions.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-quaternary/10 rounded-2xl border border-quaternary/20 animate-in slide-in-from-right-4 duration-300">
              <span className="text-[10px] font-black text-quaternary uppercase tracking-widest">
                {selectedSubmissions.length} Selected
              </span>
              <div className="w-px h-4 bg-quaternary/20 mx-2" />
              <button
                onClick={() => handleBulkAction("Approved")}
                className="p-1.5 text-quaternary hover:bg-quaternary hover:text-white rounded-lg transition-all"
                title="Approve Selected"
              >
                <HiOutlineCheck size={16} />
              </button>
              <button
                onClick={() => handleBulkAction("Rejected")}
                className="p-1.5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                title="Reject Selected"
              >
                <HiOutlineX size={16} />
              </button>
            </div>
          )}

          <div className="h-8 w-px bg-(--color-secondary)/30 hidden lg:block mx-2" />

          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-(--color-secondary)/30 rounded-2xl text-xs font-black text-(--color-sextary) uppercase tracking-widest hover:border-quaternary/30 transition-all shadow-sm">
              Sort: Newest First
              <HiOutlineChevronDown
                size={14}
                className="text-(--color-quinary)/40"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-250">
            <thead className="sticky top-0 bg-(--color-primary)/20 border-b border-(--color-secondary)/20 z-10">
              <tr>
                <th className="px-6 py-5 w-12 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-(--color-secondary)/50 text-quaternary focus:ring-quaternary"
                    checked={
                      selectedSubmissions.length ===
                        filteredSubmissions.length &&
                      filteredSubmissions.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                  Website
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                  Category
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                  Contributor
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                  Engagement
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                  Date
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--color-secondary)/10">
              {filteredSubmissions.map((s) => (
                <tr
                  key={s._id}
                  className="group hover:bg-(--color-primary)/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-(--color-secondary)/50 text-quaternary focus:ring-quaternary"
                      checked={selectedSubmissions.includes(s._id)}
                      onChange={() => toggleSelect(s._id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl border border-(--color-secondary)/20 bg-white flex items-center justify-center p-1.5 shadow-xs overflow-hidden">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${s.url}&sz=64`}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-(--color-sextary) truncate group-hover:text-quaternary transition-colors">
                          {s.name}
                        </p>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-bold text-(--color-quinary)/40 hover:text-quaternary flex items-center gap-1 transition-all"
                        >
                          {new URL(s.url).hostname}
                          <HiOutlineExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-(--color-quinary)/70 bg-(--color-primary)/40 px-3 py-1 rounded-lg">
                      {s.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-(--color-sextary)">
                        @{s.author?.username || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <HiOutlineThumbUp
                          className="text-quaternary"
                          size={14}
                        />
                        <span className="text-xs font-black">
                          {s.stats?.upvotes || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HiOutlineStar className="text-orange-500" size={14} />
                        <span className="text-xs font-black">
                          {s.stats?.rating || "-"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-(--color-quinary)/50 uppercase">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                      ${
                        s.status === "Approved"
                          ? "bg-green-50 text-green-500"
                          : s.status === "Pending"
                          ? "bg-yellow-50 text-yellow-500"
                          : "bg-red-50 text-red-500"
                      }
                    `}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/admin/submissions/${s._id}`)}
                        className="p-2 text-(--color-quinary)/40 hover:text-quaternary hover:bg-quaternary/5 rounded-xl transition-all"
                        title="View Details"
                      >
                        <HiOutlineEye size={18} />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(s._id, "Approved")}
                        className="p-2 text-(--color-quinary)/40 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all"
                        title="Approve"
                      >
                        <HiOutlineCheck size={18} />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(s._id, "Rejected")}
                        className="p-2 text-(--color-quinary)/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Reject"
                      >
                        <HiOutlineX size={18} />
                      </button>
                      <div className="w-px h-4 bg-(--color-secondary)/20 mx-1" />
                      <button className="p-2 text-(--color-quinary)/40 hover:text-(--color-sextary) hover:bg-(--color-primary)/40 rounded-xl transition-all">
                        <HiOutlineDotsVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSubmissions.length === 0 && (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-(--color-primary)/20 rounded-4xl flex items-center justify-center text-(--color-quinary)/20 mb-6">
                <HiOutlineGlobeAlt size={40} />
              </div>
              <h3 className="text-xl font-black text-(--color-sextary)">
                No submissions found
              </h3>
              <p className="text-sm text-(--color-quinary)/50 mt-1 max-w-xs">
                We couldn't find any results matching your search or filter
                criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("All");
                }}
                className="mt-6 text-xs font-black text-quaternary hover:underline uppercase tracking-widest"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="px-8 py-5 border-t border-(--color-secondary)/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-(--color-primary)/5">
          <p className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest">
            Showing <span className="text-(--color-sextary)">1-10</span> of{" "}
            <span className="text-(--color-sextary)">42</span> submissions
          </p>

          <div className="flex items-center gap-2">
            <button
              className="p-2 text-(--color-quinary)/30 hover:text-quaternary disabled:opacity-30"
              disabled
            >
              <HiOutlineChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, "...", 12].map((p, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
                    p === 1
                      ? "bg-quaternary text-white shadow-md shadow-orange-500/20"
                      : "text-(--color-quinary)/40 hover:bg-(--color-primary)"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 text-(--color-quinary)/30 hover:text-quaternary">
              <HiOutlineChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest whitespace-nowrap">
              Per page:
            </span>
            <select className="bg-transparent text-[10px] font-black text-(--color-sextary) outline-none cursor-pointer">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsManager;
