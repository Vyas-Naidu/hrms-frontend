import axios from "axios";

import { logoutUser } from "../auth";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000",
});

apiClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    try {
      const { accessToken } = JSON.parse(auth);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
      localStorage.removeItem("auth");
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (
      status === 401 &&
      error.config?.url !== "/auth/login"
    ) {
      logoutUser();
      window.location.replace("/login");
    }

    if (
      status === 403 &&
      window.location.pathname !== "/dashboard"
    ) {
      window.location.replace("/dashboard");
    }

    return Promise.reject(error);
  },
);

export default apiClient;