import React from "react";
import {
  CalendarDays,
  UsersRound,
  Download,
} from "lucide-react";
import styles from "./AttendanceTable.module.css";

const employees = [
  {
    id: "EMP101",
    name: "John Doe",
    department: "Engineering",
    days: ["A", "P", "P", "P", "P", "P", "P"],
    hours: "48h 15m",
    percentage: "100%",
    status: "Present",
  },
  {
    id: "EMP102",
    name: "Priya Sharma",
    department: "Sales",
    days: ["P", "P", "P", "A", "P", "P", "P"],
    hours: "40h 30m",
    percentage: "85.71%",
    status: "Absent",
  },
  {
    id: "EMP103",
    name: "Rohan Verma",
    department: "Marketing",
    days: ["P", "P", "L", "P", "P", "P", "P"],
    hours: "44h 00m",
    percentage: "92.85%",
    status: "On Leave",
  },
  {
    id: "EMP104",
    name: "Anjali Mehta",
    department: "Engineering",
    days: ["P", "P", "P", "P", "A", "P", "P"],
    hours: "40h 45m",
    percentage: "85.71%",
    status: "Absent",
  },
  {
    id: "EMP105",
    name: "Rahul Singh",
    department: "HR",
    days: ["P", "P", "P", "P", "P", "P", "A"],
    hours: "42h 30m",
    percentage: "85.71%",
    status: "Present",
  },
];

const AttendanceTables = () => {
  return (
    <div className={styles["attendance-table-section"]}>

      {/* Filters */}
      <div className={styles["attendance-filters"]}>

        <div className={styles["filter-box"]}>
          <label>Date Range</label>
          <div className={styles["filter-input"]}>
            <CalendarDays size={17} />
            <span>08 May 2026 - 14 May 2026</span>
            <span>⌄</span>
          </div>
        </div>

        <div className={styles["filter-box"]}>
          <label>Department</label>
          <div className={styles["filter-input"]}>
            <UsersRound size={17} />
            <span>All Departments</span>
            <span>⌄</span>
          </div>
        </div>

        <div className={styles["filter-box"]}>
          <label>Employee Status</label>
          <div className={styles["filter-input"]}>
            <UsersRound size={17} />
            <span>All Status</span>
            <span>⌄</span>
          </div>
        </div>

        <button className={styles["export-btn"]}>
          <Download size={18} />
          Export Report
        </button>

      </div>

      {/* Table */}
      <div className={styles["attendance-table-wrapper"]}>
        <table className={styles["attendance-table"]}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Sun<br />08</th>
              <th>Mon<br />09</th>
              <th>Tue<br />10</th>
              <th>Wed<br />11</th>
              <th>Thu<br />12</th>
              <th>Fri<br />13</th>
              <th>Sat<br />14</th>
              <th>Total Hours</th>
              <th>Attendance %</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>

                <td>
                  <div className={styles["employee-name"]}>
                    <div className={styles["employee-avatar"]}>
                      {employee.name.charAt(0)}
                    </div>
                    {employee.name}
                  </div>
                </td>

                <td>{employee.department}</td>

                {employee.days.map((day, index) => (
                  <td key={index}>
                    <span className={[styles["day-status"], styles[day.toLowerCase()]].filter(Boolean).join(" ")}>
                      {day}
                    </span>
                  </td>
                ))}

                <td>{employee.hours}</td>
                <td>{employee.percentage}</td>

                <td>
                  <span
                    className={[styles["status-badge"], styles[employee.status
                      .toLowerCase()
                      .replace(" ", "-")]].filter(Boolean).join(" ")}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AttendanceTables;