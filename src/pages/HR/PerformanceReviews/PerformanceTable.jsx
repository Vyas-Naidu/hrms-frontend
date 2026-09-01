import React from "react";
import "./PerformanceTable.css";

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
    <div className="performance-table-container">

      <div className="table-header">
        <div>
          <h2>Employee Review Table</h2>
          <span>Inter Medium</span>
        </div>

        <div className="review-status">
          <strong>Status:</strong>
          <span className="status-dot"></span>
          <span>In Progress</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="performance-table">
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
                  <div className="employee-info">
                    <div className={`employee-avatar avatar-${index}`}>
                      {employee.initials}
                    </div>
                    <span>{employee.name}</span>
                  </div>
                </td>

                <td>{employee.department}</td>

                <td>
                  <span className="rating-score">
                    {employee.score}
                  </span>
                </td>

                <td>{employee.cycle}</td>

                <td>
                  <button
                    className={`review-action ${employee.actionType}`}
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