import apiClient from "./api/client";

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const {
      accessToken,
      role,
      employee,
      mustChangePassword,
    } = response.data;

    const authData = {
      accessToken,
      role,
      employee,
      mustChangePassword,
    };

    localStorage.setItem("auth", JSON.stringify(authData));

    return {
      success: true,
      ...authData,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to login. Please try again.",
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("auth");
};

export const getAuth = () => {
  const auth = localStorage.getItem("auth");

  if (!auth) {
    return null;
  }

  try {
    return JSON.parse(auth);
  } catch {
    localStorage.removeItem("auth");
    return null;
  }
};

export const getCurrentUser = () => {
  return getAuth()?.employee || null;
};

export const getCurrentRole = () => {
  return getAuth()?.role || null;
};

export const getAccessToken = () => {
  return getAuth()?.accessToken || null;
};

export const isAuthenticated = () => {
  return Boolean(getAccessToken());
};