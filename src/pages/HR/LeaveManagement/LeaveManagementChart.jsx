import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import styles from "./LeaveManagementChart.module.css";

const LeaveManagementCard = () => {
  return (
    <div className={styles["leave-management-cards"]}>

      {/* TOTAL LEAVES */}
      <div className={styles["leave-card"]}>
        <div className={[styles["leave-card-icon"], styles["total-leave-icon"]].join(" ")}>
          <CalendarDays size={28} />
        </div>

        <div className={styles["leave-card-info"]}>
          <p>Total Leaves</p>
          <h2>36</h2>
          <span>All leave requests</span>
        </div>
      </div>


      {/* APPROVED */}
      <div className={styles["leave-card"]}>
        <div className={[styles["leave-card-icon"], styles["approved-leave-icon"]].join(" ")}>
          <CheckCircle2 size={28} />
        </div>

        <div className={styles["leave-card-info"]}>
          <p>Approved</p>
          <h2>24</h2>
          <span>Approved leaves</span>
        </div>
      </div>


      {/* PENDING */}
      <div className={styles["leave-card"]}>
        <div className={[styles["leave-card-icon"], styles["pending-leave-icon"]].join(" ")}>
          <Clock3 size={28} />
        </div>

        <div className={styles["leave-card-info"]}>
          <p>Pending</p>
          <h2>8</h2>
          <span>Awaiting approval</span>
        </div>
      </div>


      {/* REJECTED */}
      <div className={styles["leave-card"]}>
        <div className={[styles["leave-card-icon"], styles["rejected-leave-icon"]].join(" ")}>
          <XCircle size={28} />
        </div>

        <div className={styles["leave-card-info"]}>
          <p>Rejected</p>
          <h2>4</h2>
          <span>Rejected leaves</span>
        </div>
      </div>

    </div>
  );
};

export default LeaveManagementCard;