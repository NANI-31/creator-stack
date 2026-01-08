import React, { useState, useEffect } from "react";
import { getAuditLogs } from "../services/auditLog.service";
import type { AuditLog } from "../../../types";
import { toast } from "react-hot-toast";

// Modular Components
import AuditLogHeader from "../components/AuditLogs/AuditLogHeader";
import AuditLogFilters from "../components/AuditLogs/AuditLogFilters";
import AuditLogTable from "../components/AuditLogs/AuditLogTable";
import AuditLogDetailModal from "../components/AuditLogs/AuditLogDetailModal";

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filters
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await getAuditLogs({
        page,
        limit: 20,
        action: actionFilter || undefined,
        entityType: entityFilter || undefined,
        search: search || undefined,
      });
      setLogs(response.data.logs);
      setTotalPages(response.data.pages);
      setTotalLogs(response.data.total);
    } catch (error) {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter, entityFilter]); // Trigger on filter change or page change

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <AuditLogHeader />

      <AuditLogFilters
        search={search}
        setSearch={setSearch}
        actionFilter={actionFilter}
        setActionFilter={(val) => {
          setActionFilter(val);
          setPage(1);
        }}
        entityFilter={entityFilter}
        setEntityFilter={(val) => {
          setEntityFilter(val);
          setPage(1);
        }}
        handleSearch={handleSearch}
      />

      <AuditLogTable
        logs={logs}
        loading={loading}
        page={page}
        totalPages={totalPages}
        totalLogs={totalLogs}
        setPage={setPage}
        onOpenDetails={setSelectedLog}
      />

      {selectedLog && (
        <AuditLogDetailModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
};

export default AuditLogs;
