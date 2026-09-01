import { users } from "../data/users";

export const loginUser = (role, email, password) => {
  const user = users.find(
    (item) =>
      item.role === role &&
      item.email === email &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid role, email or password",
    };
  }

  localStorage.setItem("user", JSON.stringify(user));

  return {
    success: true,
    user,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};