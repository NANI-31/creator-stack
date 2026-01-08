import React from "react";

const AuditLogHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-(--color-sextary)">Audit Logs</h1>
      <p className="text-sm text-gray-500">
        Track administrative interactions and system changes
      </p>
    </div>
  );
};

export default AuditLogHeader;
