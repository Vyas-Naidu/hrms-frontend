import React from "react";
import DesignationCards from "./DesignationCards";
import DesignationTable from "./DesignationTable";
import "./Designations.css";

const Designations = () => {
  return (
    <div className="designations-content">

      {/* Header */}
      <div className="designation-header">
        <div>
          <h1>Designation Management</h1>
          <p>
            Manage and organize all designations in your organization.
          </p>
        </div>

        <button className="add-designation-btn">
          + Add Designation
        </button>
      </div>

      {/* Cards */}
      <DesignationCards />

      {/* Table */}
      <DesignationTable />

    </div>
  );
};

export default Designations;