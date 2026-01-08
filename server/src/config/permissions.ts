export const PERMISSIONS = {
  WEBSITE: {
    VIEW: "WEBSITE_VIEW",
    MANAGE: "WEBSITE_MANAGE",
    APPROVE: "WEBSITE_APPROVE",
  },
  USER: {
    VIEW: "USER_VIEW",
    MANAGE: "USER_MANAGE", // Edit, Change Role
    BAN: "USER_BAN",
  },
  ROLE: {
    VIEW: "ROLE_VIEW",
    MANAGE: "ROLE_MANAGE",
  },
  SETTINGS: {
    VIEW: "SETTINGS_VIEW",
    MANAGE: "SETTINGS_MANAGE",
  },
  ANALYTICS: {
    VIEW: "ANALYTICS_VIEW",
  },
  AUDIT: {
    VIEW: "AUDIT_VIEW",
  },
  REPORT: {
    VIEW: "REPORT_VIEW",
    MANAGE: "REPORT_MANAGE", // Resolve, Dismiss
  },
  CATEGORY: {
    MANAGE: "CATEGORY_MANAGE",
  },
};

// Seed Data Helpers
export const DEFAULT_ROLES = [
  {
    name: "Admin",
    description: "Full access to all system features.",
    isSystem: true,
    permissions: Object.values(PERMISSIONS).flatMap((module) =>
      Object.values(module)
    ),
  },
  {
    name: "Moderator",
    description: "Can manage content regarding websites and users.",
    isSystem: true,
    permissions: [
      PERMISSIONS.WEBSITE.VIEW,
      PERMISSIONS.WEBSITE.APPROVE,
      PERMISSIONS.USER.VIEW,
      PERMISSIONS.USER.BAN,
      PERMISSIONS.REPORT.VIEW,
      PERMISSIONS.REPORT.MANAGE,
      PERMISSIONS.AUDIT.VIEW,
    ],
  },
  {
    name: "Editor",
    description: "Can help curate content.",
    isSystem: false,
    permissions: [PERMISSIONS.WEBSITE.VIEW, PERMISSIONS.CATEGORY.MANAGE],
  },
];
