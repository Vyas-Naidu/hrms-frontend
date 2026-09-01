import React from "react";

import DashboardChart from "./DashboardChart";
import DashboardPieChart from "./DashboardPieChart";
import DashboardForms from "./DashboardForms";
import DashboardQuickAction from "./DashboardQuickAction";


import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back, Admin Alex R. Here's what's happening in your
            organization.
          </p>
        </div>

        <button className="dashboard-date">
          📅 &nbsp; May 15, 2025 &nbsp;⌄
        </button>
      </div>

    
      <DashboardChart />
      <DashboardPieChart/>
      <DashboardForms />
      <DashboardQuickAction/>

    </div>
  );
};

export default Dashboard;