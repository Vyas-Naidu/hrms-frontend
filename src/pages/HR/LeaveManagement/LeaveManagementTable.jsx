import React, { useState } from "react";
import {
  MoreVertical,
} from "lucide-react";

import styles from "./LeaveManagementTable.module.css";

const leaveRequests = [
  {
    id: "LR-0001",
    employee: "Ravi Kumar",
    empId: "EMP-125",
    leaveType: "Casual Leave",
    from: "15 May 2025",
    to: "16 May 2025",
    days: 2,
    reason: "Personal Work",
    status: "Pending",
    appliedOn: "10 May 2025",
  },
  {
    id: "LR-0002",
    employee: "Priya Sharma",
    empId: "EMP-124",
    leaveType: "Sick Leave",
    from: "14 May 2025",
    to: "16 May 2025",
    days: 3,
    reason: "Fever & Cold",
    status: "Approved",
    appliedOn: "09 May 2025",
  },
  {
    id: "LR-0003",
    employee: "Arjun Reddy",
    empId: "EMP-123",
    leaveType: "Earned Leave",
    from: "20 May 2025",
    to: "24 May 2025",
    days: 5,
    reason: "Family Function",
    status: "Pending",
    appliedOn: "08 May 2025",
  },
  {
    id: "LR-0004",
    employee: "Sneha Rao",
    empId: "EMP-122",
    leaveType: "Sick Leave",
    from: "07 May 2025",
    to: "08 May 2025",
    days: 2,
    reason: "Migraine",
    status: "Rejected",
    appliedOn: "06 May 2025",
  },
  {
    id: "LR-0005",
    employee: "Vikram Mehta",
    empId: "EMP-121",
    leaveType: "Casual Leave",
    from: "01 May 2025",
    to: "01 May 2025",
    days: 1,
    reason: "Bank Work",
    status: "Approved",
    appliedOn: "01 May 2025",
  },
];

const LeaveManagementTable = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
    "Cancelled",
  ];

  const filteredRequests =
    activeTab === "All"
      ? leaveRequests
      : leaveRequests.filter(
          (item) => item.status === activeTab
        );

  return (
    <div className={styles["leave-requests-container"]}>

      {/* Header */}
      <div className={styles["leave-requests-header"]}>

        <h3>Leave Requests</h3>

        <button className={styles["view-all-btn"]}>
          View All
        </button>

      </div>


      {/* Tabs */}
      <div className={styles["leave-request-tabs"]}>

        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? styles["active"] : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

      </div>


      {/* Table */}
      <div className={styles["leave-table-wrapper"]}>

        <table className={styles["leave-requests-table"]}>

          <thead>
            <tr>
              <th>REQUEST ID</th>
              <th>EMPLOYEE</th>
              <th>LEAVE TYPE</th>
              <th>FROM DATE</th>
              <th>TO DATE</th>
              <th>DAYS</th>
              <th>REASON</th>
              <th>STATUS</th>
              <th>APPLIED ON</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {filteredRequests.map((request) => (
              <tr key={request.id}>

                <td>{request.id}</td>

                <td>
                  <div className={styles["employee-cell"]}>
                    <div className={styles["employee-avatar"]}>
                      {request.employee.charAt(0)}
                    </div>

                    <div>
                      <strong>{request.employee}</strong>
                      <small>{request.empId}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={[styles["leave-type"], styles[request.leaveType
                      .toLowerCase()
                      .replace(" ", "-")]].filter(Boolean).join(" ")}
                  >
                    {request.leaveType}
                  </span>
                </td>

                <td>{request.from}</td>

                <td>{request.to}</td>

                <td>{request.days}</td>

                <td>{request.reason}</td>

                <td>
                  <span
                    className={[styles["request-status"], styles[request.status.toLowerCase()]].filter(Boolean).join(" ")}
                  >
                    {request.status}
                  </span>
                </td>

                <td>{request.appliedOn}</td>

                <td>
                  <button className={styles["request-action-btn"]}>
                    <MoreVertical size={18} />
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeaveManagementTable;