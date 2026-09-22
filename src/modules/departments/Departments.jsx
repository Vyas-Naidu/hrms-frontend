import React from "react";
import { useNavigate } from "react-router-dom";

import DepartmentCards from "./DepartmentCards";
import DepartmentTable from "./DepartmentTable";

import styles from "./Departments.module.css";

const Departments = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["departments-content"]}>

      <div className={styles["department-header"]}>
        <div>
          <h1>Department Management</h1>
          <p>
            Manage and organize all departments in your organization.
          </p>
        </div>

        <button
          type="button"
          className={styles["add-department-btn"]}
          onClick={() => navigate("/hr/departments/add")}
        >
          + Add Department
        </button>
      </div>

      <DepartmentCards />

      <DepartmentTable />

    </div>
  );
};

export default Departments;