import React from "react";
import { useNavigate } from "react-router-dom";
import DesignationCards from "./DesignationCards";
import DesignationTable from "./DesignationTable";
import styles from "./Designations.module.css";
const Designations = () => {
  const navigate = useNavigate();
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

      <button
  className={styles["add-designation-btn"]}
  onClick={() => navigate("/hr/designations/add")}
>
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