import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../services/auth";

function PublicRoutes() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoutes;