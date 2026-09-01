
import {
  Megaphone,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";

import styles from "./DashboardPieChart.module.css";

const DashboardPieChart = () => {
  return (
    <div className={styles["dashboard-bottom-row"]}>

      {/* ==========================
          TODAY'S ATTENDANCE
      ========================== */}
      <div className={[styles["dashboard-card"], styles["attendance-card"]].join(" ")}>

        {/* <h3>Today's Attendance</h3> */}

        <div className={styles["attendance-content"]}>

          <div className={styles["attendance-circle"]}>
            <div className={styles["attendance-inner"]}>
              <strong>87%</strong>
              <span>Attendance</span>
            </div>
          </div>

          <div className={styles["attendance-details"]}>

            <div className={styles["attendance-item"]}>
              <span className={[styles["attendance-dot"], styles["present"]].join(" ")}></span>
              <span>Present</span>
              <b>108 (87%)</b>
            </div>

            <div className={styles["attendance-item"]}>
              <span className={[styles["attendance-dot"], styles["leave"]].join(" ")}></span>
              <span>On Leave</span>
              <b>12 (10%)</b>
            </div>

            <div className={styles["attendance-item"]}>
              <span className={[styles["attendance-dot"], styles["absent"]].join(" ")}></span>
              <span>Absent</span>
              <b>4 (3%)</b>
            </div>

          </div>

        </div>

        <button className={styles["attendance-button"]}>
          View Attendance
          <ChevronRight size={20} />
        </button>

      </div>


      {/* ==========================
          ANNOUNCEMENTS
      ========================== */}
      <div className={[styles["dashboard-card"], styles["announcements-card"]].join(" ")}>

        <h3>Announcements</h3>

        <div className={styles["announcement-list"]}>

          <div className={styles["announcement-item"]}>
            <Megaphone size={20} />

            <div className={styles["announcement-info"]}>
              <strong>Office closed on May 20, 2025</strong>
              <span>May 15, 2025</span>
            </div>
          </div>


          <div className={styles["announcement-item"]}>
            <Calendar size={20} />

            <div className={styles["announcement-info"]}>
              <strong>Team meeting on May 18, 2025</strong>
              <span>May 14, 2025</span>
            </div>
          </div>


          <div className={styles["announcement-item"]}>
            <FileText size={20} />

            <div className={styles["announcement-info"]}>
              <strong>Please submit your timesheet</strong>
              <span>May 13, 2025</span>
            </div>
          </div>

        </div>

        <button className={styles["view-all-button"]}>
          View All
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default DashboardPieChart;