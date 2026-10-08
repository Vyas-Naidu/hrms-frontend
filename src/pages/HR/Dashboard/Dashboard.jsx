import React from "react";

import DashboardChart from "./DashboardChart";
import DashboardPieChart from "./DashboardPieChart";
import DashboardForms from "./DashboardForms";
import DashboardQuickAction from "./DashboardQuickAction";

import { getCurrentUser } from "../../../services/auth";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const user = getCurrentUser();

  const fullName = [
    user?.firstName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles["dashboard-page"]}>
      {/* Page Header */}
      <div className={styles["dashboard-header"]}>
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back, {fullName || "User"}. Here's what's
            happening in your organization.
          </p>
        </div>

        <button className={styles["dashboard-date"]}>
          📅 &nbsp; May 15, 2025 &nbsp;⌄
        </button>
      </div>

      <DashboardChart />

      <DashboardPieChart />

      <DashboardForms />

      <DashboardQuickAction />
    </div>
  );
};

export default Dashboard;