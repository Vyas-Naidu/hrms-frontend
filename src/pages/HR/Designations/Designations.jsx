import React from "react";
import DesignationCards from "./DesignationCards";
import DesignationTable from "./DesignationTable";
import styles from "./Designations.module.css";

const Designations = () => {
  return (
    <div className={styles["designations-content"]}>

      {/* Header */}
      <div className={styles["designation-header"]}>
        <div>
          <h1>Designation Management</h1>
          <p>
            Manage and organize all designations in your organization.
          </p>
        </div>

        <button className={styles["add-designation-btn"]}>
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