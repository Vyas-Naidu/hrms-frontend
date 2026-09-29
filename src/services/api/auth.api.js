import apiClient from "./client";

export const authApi = {
  createEmployeeAccount: (employeeId, email) =>
    apiClient.post("/auth/create-account", {
      employeeId,
      email,
    }),
};