import apiClient from "./client";

export const designationApi = {
  getAll: () => apiClient.get("/designations"),

  getById: (id) => apiClient.get(`/designations/${id}`),

  create: (data) => apiClient.post("/designations", data),

  update: (id, data) => apiClient.put(`/designations/${id}`, data),

  remove: (id) => apiClient.delete(`/designations/${id}`),
};