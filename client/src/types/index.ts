export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface WebsiteStats {
  upvotes: number;
  rating: number;
  commentCount?: number;
  comments?: number;
}

export interface Website {
  _id: string;
  name: string;
  description: string;
  url: string;
  category: string | Category;
  thumbnail: string;
  tags: string[];
  author: string | User;
  status: "Pending" | "Approved" | "Rejected";
  stats: WebsiteStats;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  color?: string;
  websiteCount?: number;
}

export interface DashboardStats {
  contributed: number;
  upvotes: number;
  comments: number;
  rating: number;
}

export interface Notification {
  _id: string;
  recipient: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  priority: "High" | "Medium" | "Low";
  category: "System" | "Submission" | "Report" | "User";
  isRead: boolean;
  link?: string;
  relatedId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  _id: string;
  adminId: string;
  adminName: string;
  action:
    | "Create"
    | "Update"
    | "Delete"
    | "Approve"
    | "Reject"
    | "Ban"
    | "Suspend"
    | "Other";
  entityType:
    | "Website"
    | "User"
    | "Comment"
    | "Category"
    | "Report"
    | "Settings"
    | "Other";
  entityId: string;
  details?: {
    before?: any;
    after?: any;
    notes?: string;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}
