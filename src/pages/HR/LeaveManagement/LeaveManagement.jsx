import React from "react";

import LeaveManagementCard from "./LeaveManagementChart";
import LeaveManagementGraph from "./LeaveManagementGraph";
import LeaveManagementTable from "./LeaveManagementTable";

import "./LeaveManagement.css";

const LeaveManagement = () => {
  return (
    <div className="leave-management-content">

      {/* Header */}
      <div className="leave-page-header">
        <div>
          <h1>Leave Management</h1>
          <p>Home › Leave Management</p>
        </div>

        <button className="apply-leave-btn">
          + Apply Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <LeaveManagementCard />

      {/* Charts + Calendar + Summary */}
      <LeaveManagementGraph />

      {/* Leave Requests Table */}
      <LeaveManagementTable />

    </div>
  );
};

export default LeaveManagement;