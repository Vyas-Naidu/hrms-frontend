import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  CalendarCheck,
  Plane,
  UserX,
} from "lucide-react";

import styles from "./DashboardChart.module.css";

const DashboardChart = () => {
   const navigate = useNavigate();
  return (
    <div className={styles["dashboard-chart"]} >

      {/* Total Employees */}
      <div className={styles["chart-card"]}
       onClick={() => navigate("/hr/employeemanagement")}>
     
        <div className={[styles["chart-icon"], styles["employees"]].join(" ")}>
          <Users size={28} strokeWidth={2.2} />
        </div>

        <div className={styles["chart-info"]}>
          <p>Total Employees</p>
          <h2>124</h2>
          <span className={styles["chart-success"]}>
            ↑ 8 this month
          </span>
        </div>
      </div>


      {/* Departments */}
      <div className={styles["chart-card"]}>
        <div className={[styles["chart-icon"], styles["departments"]].join(" ")}>
          <Building2 size={28} strokeWidth={2.2} />
        </div>

        <div className={styles["chart-info"]}>
          <p>Departments</p>
          <h2>8</h2>
          <span className={styles["chart-success"]}>
            ↑ 1 this month
          </span>
        </div>
      </div>


      {/* Present Today */}
      <div className={styles["chart-card"]}>
        <div className={[styles["chart-icon"], styles["present"]].join(" ")}>
          <CalendarCheck size={28} strokeWidth={2.2} />
        </div>

        <div className={styles["chart-info"]}>
          <p>Present Today</p>
          <h2>108</h2>
          <span className={styles["chart-success"]}>
            87% attendance
          </span>
        </div>
      </div>


      {/* On Leave */}
      <div className={styles["chart-card"]}>
        <div className={[styles["chart-icon"], styles["leave"]].join(" ")}>
          <Plane size={28} strokeWidth={2.2} />
        </div>

        <div className={styles["chart-info"]}>
          <p>On Leave</p>
          <h2>12</h2>
          <span className={styles["chart-warning"]}>
            Today
          </span>
        </div>
      </div>


      {/* Absent Today */}
      <div className={styles["chart-card"]}>
        <div className={[styles["chart-icon"], styles["absent"]].join(" ")}>
          <UserX size={28} strokeWidth={2.2} />
        </div>

        <div className={styles["chart-info"]}>
          <p>Absent Today</p>
          <h2>4</h2>
          <span className={styles["chart-danger"]}>
            3% attendance
          </span>
        </div>
      </div>

    </div>
  );
};

export default DashboardChart;