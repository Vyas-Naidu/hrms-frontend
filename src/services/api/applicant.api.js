import apiClient from "./client";

export const applicantApi = {
  getAll: () => apiClient.get("/job-applicants"),

  getById: (id) => apiClient.get(`/job-applicants/${id}`),

  create: (data) => apiClient.post("/job-applicants", data),

  update: (id, data) => apiClient.put(`/job-applicants/${id}`, data),

  remove: (id) => apiClient.delete(`/job-applicants/${id}`),
};
