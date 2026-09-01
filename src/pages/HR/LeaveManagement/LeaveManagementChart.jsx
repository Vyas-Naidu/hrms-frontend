import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import "./LeaveManagementChart.css";

const LeaveManagementCard = () => {
  return (
    <div className="leave-management-cards">

      {/* TOTAL LEAVES */}
      <div className="leave-card">
        <div className="leave-card-icon total-leave-icon">
          <CalendarDays size={28} />
        </div>

        <div className="leave-card-info">
          <p>Total Leaves</p>
          <h2>36</h2>
          <span>All leave requests</span>
        </div>
      </div>


      {/* APPROVED */}
      <div className="leave-card">
        <div className="leave-card-icon approved-leave-icon">
          <CheckCircle2 size={28} />
        </div>

        <div className="leave-card-info">
          <p>Approved</p>
          <h2>24</h2>
          <span>Approved leaves</span>
        </div>
      </div>


      {/* PENDING */}
      <div className="leave-card">
        <div className="leave-card-icon pending-leave-icon">
          <Clock3 size={28} />
        </div>

        <div className="leave-card-info">
          <p>Pending</p>
          <h2>8</h2>
          <span>Awaiting approval</span>
        </div>
      </div>


      {/* REJECTED */}
      <div className="leave-card">
        <div className="leave-card-icon rejected-leave-icon">
          <XCircle size={28} />
        </div>

        <div className="leave-card-info">
          <p>Rejected</p>
          <h2>4</h2>
          <span>Rejected leaves</span>
        </div>
      </div>

    </div>
  );
};

export default LeaveManagementCard;