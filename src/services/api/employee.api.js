import apiClient from "./client";

export const employeeApi = {
  getAll: () => apiClient.get("/employees"),
  getMe: () => apiClient.get("/employees/me"),

  getById: (id) => apiClient.get(`/employees/${id}`),
  getMyPhoto: () =>
    apiClient.get("/employees/me/photo", {
      responseType: "blob",
    }),
  create: (formData) =>
    apiClient.post("/employees", formData),

  update: (id, data) =>
    apiClient.put(`/employees/${id}`, data),

  remove: (id) =>
    apiClient.delete(`/employees/${id}`),

  getDocuments: (employeeId) =>
    apiClient.get(`/employees/${employeeId}/documents`),

  uploadDocuments: (employeeId, formData) =>
    apiClient.post(`/employees/${employeeId}/documents`, formData),

  downloadDocument: (documentId) =>
    apiClient.get(`/documents/${documentId}`, {
      responseType: "blob",
    }),
};