import React from "react";
import PerformanceCards from "./PerformanceCards";
import PerformanceOverview from "./PerformanceOverview";
import PerformanceTable from "./PerformanceTable";
import "./PerformanceReviews.css";

const PerformanceReview = () => {
  return (
    <div className="performance-review">
      <div className="performance-header">
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