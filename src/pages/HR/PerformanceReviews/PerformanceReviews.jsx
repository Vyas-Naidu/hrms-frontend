import React from "react";
import PerformanceCards from "./PerformanceCards";
import PerformanceOverview from "./PerformanceOverview";
import PerformanceTable from "./PerformanceTable";
import styles from "./PerformanceReviews.module.css";

const PerformanceReview = () => {
  return (
    <div className={styles["performance-review"]}>
      <div className={styles["performance-header"]}>
        <h1>Performance Review</h1>
        <p>Assess and analyze employee performance metrics</p>
      </div>

      <PerformanceCards />
      <PerformanceOverview />
      <PerformanceTable />
    </div>
  );
};

export default PerformanceReview;