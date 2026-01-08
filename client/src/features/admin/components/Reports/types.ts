export interface Report {
  id: string;
  type: "Website" | "Comment" | "User";
  targetId: string;
  targetName: string; // Title of website, username, or comment preview
  targetPreview: string; // Full content or description
  reporter: string;
  reason: "Spam" | "Abuse" | "Misleading" | "Copyright" | "Other";
  severity: "Low" | "Medium" | "High";
  status: "Pending" | "Resolved" | "Dismissed";
  timestamp: string;
}

export type ReportStatus = "All" | "Pending" | "Resolved" | "Dismissed";
export type ReportType = "All" | "Website" | "Comment" | "User";
