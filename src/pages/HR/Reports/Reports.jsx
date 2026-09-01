import React from "react";
import ReportsCard from "./ReportsCard";
import ReportsTable from "./ReportsTable";
import styles from "./Reports.module.css";

const Reports = () => {
  return (
    <div className={styles["reports-page"]}>
      <div className={styles["reports-header"]}>
        <div>
          <h1>Reports</h1>
          <div className={styles["reports-breadcrumb"]}>
            <span>Home</span>
            <span>›</span>
            <span>Reports</span>
          </div>
        </div>

        <button className={styles["custom-report-btn"]}>
          ↓ &nbsp; Generate Custom Report
        </button>
      </div>

      <ReportsCard />
      <ReportsTable />
    </div>
  );
};

export default Reports;