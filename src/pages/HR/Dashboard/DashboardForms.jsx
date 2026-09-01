import React from "react";
import styles from "./DashboardForms.module.css";
import {
  Users,
  Building2,
  CalendarCheck,
  Plane,
  UserX,
  UserPlus,
  ClipboardCheck,
  BarChart3,
  IndianRupee,
  FileText,
  Megaphone,
  Calendar,
  ChevronRight,
} from "lucide-react";

const DashboardForms = () => {
  return (
    <>

      {/* ==========================
          BOTTOM FORMS
      ========================== */}

      <div className={styles["bottom-grid"]}>

        {/* RECENT EMPLOYEES */}

        <div className={[styles["dashboard-card"], "recent-employees"].join(" ")}>

          <h3>Recent Employees</h3>

          <div className={styles["table-container"]}>

            <table>

              <thead>
                <tr>
                  <th>EMPLOYEE ID</th>
                  <th>NAME</th>
                  <th>DEPARTMENT</th>
                  <th>DESIGNATION</th>
                  <th>JOINING DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>EMP-125</td>
                  <td>
                    <div className={styles["employee-name"]}>
                      <span>RK</span>
                      Ravi Kumar
                    </div>
                  </td>
                  <td>Engineering</td>
                  <td>Software Engineer</td>
                  <td>May 10, 2025</td>
                  <td>
                    <span className={[styles["status"], styles["active"]].join(" ")}>Active</span>
                  </td>
                </tr>

                <tr>
                  <td>EMP-124</td>
                  <td>
                    <div className={styles["employee-name"]}>
                      <span>PS</span>
                      Priya Sharma
                    </div>
                  </td>
                  <td>Human Resources</td>
                  <td>HR Executive</td>
                  <td>May 08, 2025</td>
                  <td>
                    <span className={[styles["status"], styles["active"]].join(" ")}>Active</span>
                  </td>
                </tr>

                <tr>
                  <td>EMP-123</td>
                  <td>
                    <div className={styles["employee-name"]}>
                      <span>AR</span>
                      Arjun Reddy
                    </div>
                  </td>
                  <td>Finance</td>
                  <td>Accountant</td>
                  <td>May 05, 2025</td>
                  <td>
                    <span className={[styles["status"], styles["active"]].join(" ")}>Active</span>
                  </td>
                </tr>

                <tr>
                  <td>EMP-122</td>
                  <td>
                    <div className={styles["employee-name"]}>
                      <span>SR</span>
                      Sneha Rao
                    </div>
                  </td>
                  <td>Marketing</td>
                  <td>Marketing Executive</td>
                  <td>May 01, 2025</td>
                  <td>
                    <span className={[styles["status"], styles["leave-status"]].join(" ")}>
                      On Leave
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>EMP-121</td>
                  <td>
                    <div className={styles["employee-name"]}>
                      <span>VM</span>
                      Vikram Mehta
                    </div>
                  </td>
                  <td>Engineering</td>
                  <td>Junior Developer</td>
                  <td>Apr 28, 2025</td>
                  <td>
                    <span className={[styles["status"], styles["active"]].join(" ")}>Active</span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <button className={styles["card-button"]}>
            View All Employees
            <ChevronRight size={16} />
          </button>

        </div>

        {/* ANNOUNCEMENTS */}

        {/* <div className={styles["dashboard-card"]}>

          <h3>Announcements</h3>

          <div className={"announcement"}>

            <div className={"announcement-icon"}>
              <Megaphone size={20} />
            </div>

            <div>
              <b>Office closed on May 20, 2025</b>
              <small>May 15, 2025</small>
            </div>

          </div>

          <div className={"announcement"}>

            <div className={"announcement-icon"}>
              <Calendar size={20} />
            </div>

            <div>
              <b>Team meeting on May 18, 2025</b>
              <small>May 14, 2025</small>
            </div>

          </div>

          <div className={"announcement"}>

            <div className={"announcement-icon"}>
              <FileText size={20} />
            </div>

            <div>
              <b>Please submit your timesheet</b>
              <small>May 13, 2025</small>
            </div>

          </div>

          <button className={styles["card-button"]}>
            View All
            <ChevronRight size={16} />
          </button>

        </div> */}

      </div>

    </>
  );
};

export default DashboardForms;