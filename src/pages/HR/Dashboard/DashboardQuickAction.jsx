// import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardQuickAction.css";

import {
  Plane,
  UserPlus,
  ClipboardCheck,
  BarChart3,
  IndianRupee,
  FileText,
} from "lucide-react";

const DashboardQuickAction = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-card">
      <h3>Quick Actions</h3>

      <div className="action-grid">

        <div className="action-item"
        onClick={() => navigate("/hr/employee-registration")}>
          <UserPlus size={30} />
          <span>Add Employee</span>
        </div>

        <div className="action-item">
          <Plane size={30} />
          <span>Leave Request</span>
        </div>

        <div className="action-item">
          <ClipboardCheck size={30} />
          <span>Attendance</span>
        </div>

        <div className="action-item">
          <BarChart3 size={30} />
          <span>Performance Review</span>
        </div>

        <div className="action-item">
          <IndianRupee size={30} />
          <span>Payroll</span>
        </div>

        <div className="action-item">
          <FileText size={30} />
          <span>Reports</span>
        </div>

      </div>
    </div>
  );
};

export default DashboardQuickAction;
   {/* ==========================
          LEAVE SUMMARY
      ========================== */}

    //   <div className="dashboard-card pie-card">

    //     <h3>Leave Summary</h3>

    //     <div className="pie-content">

    //       <div className="leave-pie">
    //         <div className="pie-center">
    //           <strong>36</strong>
    //           <small>Total Leaves</small>
    //         </div>
    //       </div>

    //       <div className="pie-legend">

    //         <div className="legend-row">
    //           <span className="dot green-dot"></span>
    //           <span>Casual Leave</span>
    //           <b>14 (39%)</b>
    //         </div>

    //         <div className="legend-row">
    //           <span className="dot yellow-dot"></span>
    //           <span>Sick Leave</span>
    //           <b>16 (44%)</b>
    //         </div>

    //         <div className="legend-row">
    //           <span className="dot red-dot"></span>
    //           <span>Other Leave</span>
    //           <b>6 (17%)</b>
    //         </div>

    //       </div>

    //     </div>

    //     <button className="card-button">
    //       View All Leaves
    //       <ChevronRight size={16} />
    //     </button>

    //   </div> 
