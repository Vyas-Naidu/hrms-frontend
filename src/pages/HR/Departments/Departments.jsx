import React from "react";

import DepartmentCards from "./DepartmentCards";
import DepartmentTable from "./DepartmentTable";

import styles from "./Departments.module.css";

const Departments = () => {
  return (
    <div className={styles["departments-content"]}>

      <div className={styles["department-header"]}>
        <div>
          <h1>Department Management</h1>
          <p>
            Manage and organize all departments in your organization.
          </p>
        </div>

        <button className={styles["add-department-btn"]}>
          + Add Department
        </button>
      </div>

      <DepartmentCards />

      <DepartmentTable />

    </div>
  );
};

export default Departments;