export type UserRole = "Admin" | "Moderator" | "User";
export type UserStatus = "Active" | "Suspended" | "Banned";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  reputation: number;
  submissions: number;
  comments: number;
  joinedDate: string;
}

export type RoleFilter = "All" | UserRole;
export type StatusFilter = "All" | UserStatus;
