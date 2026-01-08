import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import SubmissionStats from "../components/SubmissionStats";
import {
  HiOutlineThumbUp,
  HiOutlineStar,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchDashboardData } from "../../websites/slice/website.slice";
import { Link } from "react-router-dom";

const MyContributions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const dispatch = useAppDispatch();
  const { myContributions, isLoading } = useAppSelector(
    (state) => state.websites
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Calculate stats from data
  const stats = {
    total: myContributions.length,
    approved: myContributions.filter((c) => c.status === "Approved").length,
    pending: myContributions.filter((c) => c.status === "Pending").length,
    rejected: myContributions.filter((c) => c.status === "Rejected").length,
  };

  const filteredContributions = myContributions.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-(--color-sextary) mb-2">
            Website Submissions
          </h1>
          <p className="text-(--color-quinary)/70 font-medium">
            Submit and manage your contributed websites
          </p>
        </div>
        <Link to="/submit">
          <Button
            variant="primary"
            className="px-8! shadow-lg shadow-orange-500/20"
          >
            + Submit New Website
          </Button>
        </Link>
      </div>

      <SubmissionStats stats={stats} />

      {/* Filters & Actions */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
          {/* Status Filters */}
          <div className="flex items-center gap-2 p-1.5 bg-(--color-primary)/30 rounded-2xl w-full lg:w-fit">
            {["All", "Approved", "Pending", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  statusFilter === status
                    ? "bg-white text-quaternary shadow-sm"
                    : "text-(--color-quinary)/50 hover:text-quaternary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full md:w-80">
              <HiOutlineSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search submissions by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-(--color-primary)/20 border border-transparent focus:border-(--color-secondary)/40 rounded-2xl outline-none text-sm font-medium transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-(--color-quinary)/70 hover:text-quaternary bg-(--color-primary)/20 rounded-2xl transition-all whitespace-nowrap">
              <HiOutlineFilter /> Sort by: Newest
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm overflow-hidden min-h-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-(--color-secondary)/40">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-(--color-quinary)/40">
                  Website
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-(--color-quinary)/40">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-(--color-quinary)/40">
                  Engagement
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-(--color-quinary)/40">
                  Date
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-(--color-quinary)/40 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--color-secondary)/20">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-6">
                        <div className="h-12 bg-(--color-primary)/10 rounded-2xl w-full" />
                      </td>
                    </tr>
                  ))
              ) : filteredContributions.length > 0 ? (
                filteredContributions.map((item) => (
                  <tr
                    key={item._id}
                    className="group hover:bg-(--color-primary)/10 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-(--color-secondary)/40 rounded-[1.25rem] flex items-center justify-center text-quaternary font-black text-xl shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            item.name.charAt(0)
                          )}
                        </div>
                        <div className="max-w-50">
                          <h4 className="font-black text-(--color-sextary) group-hover:text-quaternary transition-colors truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-bold text-(--color-quinary)/40 uppercase tracking-wider bg-(--color-secondary)/20 px-2 py-0.5 rounded-md">
                            {typeof item.category === "string"
                              ? item.category
                              : (item.category as { name?: string })?.name ||
                                "Resource"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          item.status === "Approved"
                            ? "bg-green-100/80 text-green-600"
                            : item.status === "Pending"
                            ? "bg-amber-100/80 text-amber-600"
                            : "bg-red-100/80 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-black text-(--color-sextary)">
                            {item.stats?.upvotes || 0}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-(--color-quinary)/40">
                            <HiOutlineThumbUp size={12} />
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-black text-(--color-sextary)">
                            {item.stats?.rating || 0}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-(--color-quinary)/40">
                            <HiOutlineStar size={12} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-(--color-quinary)/60">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2.5 text-(--color-quinary)/40 hover:text-quaternary hover:bg-white rounded-xl shadow-sm hover:shadow transition-all"
                          title="View Public Page"
                        >
                          <HiOutlineEye size={18} />
                        </button>
                        <button
                          className="p-2.5 text-(--color-quinary)/40 hover:text-blue-500 hover:bg-white rounded-xl shadow-sm hover:shadow transition-all"
                          title="Edit Submission"
                        >
                          <HiOutlinePencil size={18} />
                        </button>
                        {item.status === "Rejected" && (
                          <button
                            className="p-2.5 text-(--color-quinary)/40 hover:text-tertiary hover:bg-white rounded-xl shadow-sm hover:shadow transition-all"
                            title="Resubmit"
                          >
                            <HiOutlineRefresh size={18} />
                          </button>
                        )}
                        <button
                          className="p-2.5 text-(--color-quinary)/40 hover:text-red-500 hover:bg-white rounded-xl shadow-sm hover:shadow transition-all"
                          title="Delete Submission"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-(--color-secondary)/30 rounded-full flex items-center justify-center text-quinary/40">
                        <HiOutlineGlobeAlt size={40} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-(--color-sextary)">
                          You haven't submitted any websites yet
                        </h3>
                        <p className="text-(--color-quinary)/50 font-medium max-w-sm mx-auto mt-1">
                          Share your discoveries with the community and track
                          their growth here.
                        </p>
                      </div>
                      <Link to="/submit">
                        <Button
                          variant="outline"
                          className="px-8! border-quaternary! text-quaternary! hover:bg-quaternary! hover:text-white!"
                        >
                          Submit Your First Website
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filteredContributions.length > 0 && (
          <div className="px-8 py-5 bg-(--color-secondary)/10 border-t border-(--color-secondary)/20 flex items-center justify-between">
            <span className="text-xs font-bold text-(--color-quinary)/40">
              Showing {filteredContributions.length} of {myContributions.length}{" "}
              entries
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-black text-(--color-quinary)/40 cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 text-xs font-black text-quaternary border-b-2 border-quaternary">
                1
              </button>
              <button className="px-4 py-2 text-xs font-black text-(--color-quinary)/40 hover:text-quaternary transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContributions;
