import apiClient from "./client";

export const offerApi = {
  getAll: () => apiClient.get("/job-offers"),

  create: (data) =>
    apiClient.post("/job-offers", data),

  accept: (id) =>
    apiClient.put(`/job-offers/${id}/accept`),

  reject: (id) =>
    apiClient.put(`/job-offers/${id}/reject`),
};