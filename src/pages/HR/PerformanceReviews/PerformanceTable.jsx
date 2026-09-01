import React from "react";
import styles from "./PerformanceTable.module.css";

const employees = [
  {
    initials: "JD",
    name: "Johnathan Doe",
    department: "Engineering",
    score: "4.6",
    cycle: "Q3 2026",
    action: "View Details",
    actionType: "view",
  },
  {
    initials: "EC",
    name: "Emily Chen",
    department: "Sales",
    score: "4.1",
    cycle: "Q3 2026",
    action: "Request Feedback",
    actionType: "feedback",
  },
];

const PerformanceTable = () => {
  return (
    <div className={styles["performance-table-container"]}>

      <div className={styles["table-header"]}>
        <div>
          <h2>Employee Review Table</h2>
          <span>Inter Medium</span>
        </div>

        <div className={styles["review-status"]}>
          <strong>Status:</strong>
          <span className={styles["status-dot"]}></span>
          <span>In Progress</span>
        </div>
      </div>

      <div className={styles["table-wrapper"]}>
        <table className={styles["performance-table"]}>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Rating Score</th>
              <th>Review Cycle</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className={styles["employee-info"]}>
                    <div className={[styles["employee-avatar"], "avatar-", styles[index]].filter(Boolean).join(" ")}>
                      {employee.initials}
                    </div>
                    <span>{employee.name}</span>
                  </div>
                </td>

                <td>{employee.department}</td>

                <td>
                  <span className={styles["rating-score"]}>
                    {employee.score}
                  </span>
                </td>

                <td>{employee.cycle}</td>

                <td>
                  <button
                    className={[styles["review-action"], styles[employee.actionType]].filter(Boolean).join(" ")}
                  >
                    {employee.action}
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

export default PerformanceTable;