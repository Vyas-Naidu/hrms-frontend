import React from "react";
import ReportsCard from "./ReportsCard";
import ReportsTable from "./ReportsTable";
import "./Reports.css";

const Reports = () => {
  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <div className="reports-breadcrumb">
            <span>Home</span>
            <span>›</span>
            <span>Reports</span>
          </div>
        </div>

        <button className="custom-report-btn">
          ↓ &nbsp; Generate Custom Report
        </button>
      </div>

      <ReportsCard />
      <ReportsTable />
    </div>
  );
};

export default Reports;