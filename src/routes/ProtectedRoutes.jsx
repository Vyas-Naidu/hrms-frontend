import { Navigate, Outlet } from "react-router-dom";

import {
  getCurrentRole,
  isAuthenticated,
} from "../services/auth";

function ProtectedRoute({ roles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getCurrentRole();

  if (roles && !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
