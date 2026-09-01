import React from "react";

import DepartmentCards from "./DepartmentCards";
import DepartmentTable from "./DepartmentTable";

import "./Departments.css";

const Departments = () => {
  return (
    <div className="departments-content">

      <div className="department-header">
        <div>
          <h1>Department Management</h1>
          <p>
            Manage and organize all departments in your organization.
          </p>
        </div>

        <button className="add-department-btn">
          + Add Department
        </button>
      </div>

      <DepartmentCards />

      <DepartmentTable />

    </div>
  );
};

export default Departments;