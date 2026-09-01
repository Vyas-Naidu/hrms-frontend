import React from "react";
import {
  BriefcaseBusiness,
  Users,
  UserPlus,
  Star
} from "lucide-react";

import "./DesignationCards.css";

const DesignationCards = () => {
  return (
    <div className="designation-cards">

      {/* Total Designations */}
      <div className="designation-card">
        <div className="designation-card-icon orange">
          <BriefcaseBusiness size={28} />
        </div>

        <div className="designation-card-info">
          <span>Total Designations</span>
          <h2>12</h2>
          <p>Active designations</p>
        </div>
      </div>

      {/* Total Employees */}
      <div className="designation-card">
        <div className="designation-card-icon green">
          <Users size={28} />
        </div>

        <div className="designation-card-info">
          <span>Total Employees</span>
          <h2>124</h2>
          <p>Across all designations</p>
        </div>
      </div>

      {/* This Month Added */}
      <div className="designation-card">
        <div className="designation-card-icon blue">
          <UserPlus size={28} />
        </div>

        <div className="designation-card-info">
          <span>This Month Added</span>
          <h2>2</h2>
          <p>New designations</p>
        </div>
      </div>

      {/* Most Common Designation */}

    </div>
  );
};

export default DesignationCards;