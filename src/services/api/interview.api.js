import apiClient from "./client";

export const interviewApi = {
  getAll: () => apiClient.get("/interviews"),

  getById: (id) => apiClient.get(`/interviews/${id}`),

  create: (data) => apiClient.post("/interviews", data),

  update: (id, data) => apiClient.put(`/interviews/${id}`, data),

  cancel: (id) => apiClient.put(`/interviews/${id}/cancel`),
  createFeedback: (id, data) =>
    apiClient.post(`/interviews/${id}/feedback`, data),

  getFeedback: (id) => apiClient.get(`/interviews/${id}/feedback`),

  updateFeedback: (id, data) =>
    apiClient.put(`/interview-feedback/${id}`, data),
};
