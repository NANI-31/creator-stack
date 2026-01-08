import api from "../../../services/api";

export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  userCount?: number;
}

export const getRoles = async () => {
  const response = await api.get<{
    success: boolean;
    data: Role[];
  }>("/admin/roles");
  return response.data;
};

export const createRole = async (data: Partial<Role>) => {
  const response = await api.post<{
    success: boolean;
    data: Role;
  }>("/admin/roles", data);
  return response.data;
};

export const updateRole = async (id: string, data: Partial<Role>) => {
  const response = await api.put<{
    success: boolean;
    data: Role;
  }>(`/admin/roles/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: string) => {
  const response = await api.delete<{
    success: boolean;
    data: null;
  }>(`/admin/roles/${id}`);
  return response.data;
};
