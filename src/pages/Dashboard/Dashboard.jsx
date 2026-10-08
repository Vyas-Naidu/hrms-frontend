import { getCurrentRole } from "../../services/auth";

import AdminDashboard from "../Admin/Dashboard";
import EmployeeDashboard from "../Employee/Dashboard";
import HRDashboard from "../HR/Dashboard/Dashboard";

function Dashboard() {
  const role = getCurrentRole();

  switch (role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "HR":
      return <HRDashboard />;

    case "EMPLOYEE":
      return <EmployeeDashboard />;

    default:
      return null;
  }
}

export default Dashboard;