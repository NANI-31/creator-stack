import api from "../../../services/api";
import type { User } from "../../../types";

export const authApi = {
  register: (userData: Partial<User> & { password?: string }) =>
    api.post("/auth/register", userData),
  login: (credentials: { email?: string; password?: string }) =>
    api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
};
