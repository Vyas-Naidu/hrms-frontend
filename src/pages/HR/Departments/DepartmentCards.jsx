import React from "react";
import {
  Building2,
  Users,
  Network,
  UserRound,
} from "lucide-react";

import "./DepartmentCards.css";

const DepartmentCards = () => {
  return (
    <div className="department-cards">

      {/* Total Departments */}
      <div className="department-card">
        <div className="department-card-icon departments-icon">
          <Building2 size={28} />
        </div>

        <div className="department-card-info">
          <p>Total Departments</p>
          <h2>8</h2>
          <span className="card-success">
            Active departments
          </span>
        </div>
      </div>


      {/* Total Employees */}
      <div className="department-card">
        <div className="department-card-icon employees-icon">
          <Users size={28} />
        </div>

        <div className="department-card-info">
          <p>Total Employees</p>
          <h2>124</h2>
          <span className="card-success">
            Across all departments
          </span>
        </div>
      </div>


      {/* This Month */}
      <div className="department-card">
        <div className="department-card-icon month-icon">
          <Network size={28} />
        </div>

        <div className="department-card-info">
          <p>This Month</p>
          <h2>1</h2>
          <span className="card-success">
            New department
          </span>
        </div>
      </div>

    </div>
  );
};

export default DepartmentCards;