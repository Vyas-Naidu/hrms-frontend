import apiClient from "./client";

export const employeeApi = {
  getAll: () => apiClient.get("/employees"),

  getById: (id) => apiClient.get(`/employees/${id}`),

  create: (formData) =>
    apiClient.post("/employees", formData),

  update: (id, data) =>
    apiClient.put(`/employees/${id}`, data),

  remove: (id) =>
    apiClient.delete(`/employees/${id}`),

  getDocuments: (employeeId) =>
    apiClient.get(`/employees/${employeeId}/documents`),

  downloadDocument: (documentId) =>
    apiClient.get(`/documents/${documentId}`, {
      responseType: "blob",
    }),
};