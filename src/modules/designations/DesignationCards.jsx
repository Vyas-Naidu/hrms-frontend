import React from "react";
import {
  BriefcaseBusiness,
  Users,
  UserPlus,
  Star
} from "lucide-react";

import styles from "./DesignationCards.module.css";

const DesignationCards = () => {
  return (
    <div className={styles["designation-cards"]}>

      {/* Total Designations */}
      <div className={styles["designation-card"]}>
        <div className={[styles["designation-card-icon"], styles["orange"]].join(" ")}>
          <BriefcaseBusiness size={28} />
        </div>

        <div className={styles["designation-card-info"]}>
          <span>Total Designations</span>
          <h2>12</h2>
          <p>Active designations</p>
        </div>
      </div>

      {/* Total Employees */}
      <div className={styles["designation-card"]}>
        <div className={[styles["designation-card-icon"], styles["green"]].join(" ")}>
          <Users size={28} />
        </div>

        <div className={styles["designation-card-info"]}>
          <span>Total Employees</span>
          <h2>124</h2>
          <p>Across all designations</p>
        </div>
      </div>

      {/* This Month Added */}
      <div className={styles["designation-card"]}>
        <div className={[styles["designation-card-icon"], styles["blue"]].join(" ")}>
          <UserPlus size={28} />
        </div>

        <div className={styles["designation-card-info"]}>
          <span>This Month Added</span>
          <h2>2</h2>
          <p>New designations</p>
        </div>
      </div>

      {/* Most Common Designation */}

    </div>
  );
};

export default DesignationCards;