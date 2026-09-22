import React from "react";
import {
  Building2,
  Users,
  Network,
  UserRound,
} from "lucide-react";

import styles from "./DepartmentCards.module.css";

const DepartmentCards = () => {
  return (
    <div className={styles["department-cards"]}>

      {/* Total Departments */}
      <div className={styles["department-card"]}>
        <div className={[styles["department-card-icon"], styles["departments-icon"]].join(" ")}>
          <Building2 size={28} />
        </div>

        <div className={styles["department-card-info"]}>
          <p>Total Departments</p>
          <h2>8</h2>
          <span className={styles["card-success"]}>
            Active departments
          </span>
        </div>
      </div>


      {/* Total Employees */}
      <div className={styles["department-card"]}>
        <div className={[styles["department-card-icon"], styles["employees-icon"]].join(" ")}>
          <Users size={28} />
        </div>

        <div className={styles["department-card-info"]}>
          <p>Total Employees</p>
          <h2>124</h2>
          <span className={styles["card-success"]}>
            Across all departments
          </span>
        </div>
      </div>


      {/* This Month */}
      <div className={styles["department-card"]}>
        <div className={[styles["department-card-icon"], styles["month-icon"]].join(" ")}>
          <Network size={28} />
        </div>

        <div className={styles["department-card-info"]}>
          <p>This Month</p>
          <h2>1</h2>
          <span className={styles["card-success"]}>
            New department
          </span>
        </div>
      </div>

    </div>
  );
};

export default DepartmentCards;