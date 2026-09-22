import apiClient from "./client";

export const recruitmentApi = {
  getJobOpenings: () => apiClient.get("/job-openings"),

  getJobOpeningById: (id) => apiClient.get(`/job-openings/${id}`),

  createJobOpening: (data) => apiClient.post("/job-openings", data),

  updateJobOpening: (id, data) => apiClient.put(`/job-openings/${id}`, data),

  deleteJobOpening: (id) => apiClient.delete(`/job-openings/${id}`),
  getDashboard: () => apiClient.get("/recruitment/dashboard"),

  getPipeline: () => apiClient.get("/recruitment/pipeline"),
};
