import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  CalendarCheck,
  Plane,
  UserX,
} from "lucide-react";

import "./DashboardChart.css";

const DashboardChart = () => {
   const navigate = useNavigate();
  return (
    <div className="dashboard-chart" >

      {/* Total Employees */}
      <div className="chart-card"
       onClick={() => navigate("/hr/employeemanagement")}>
     
        <div className="chart-icon employees">
          <Users size={28} strokeWidth={2.2} />
        </div>

        <div className="chart-info">
          <p>Total Employees</p>
          <h2>124</h2>
          <span className="chart-success">
            ↑ 8 this month
          </span>
        </div>
      </div>


      {/* Departments */}
      <div className="chart-card">
        <div className="chart-icon departments">
          <Building2 size={28} strokeWidth={2.2} />
        </div>

        <div className="chart-info">
          <p>Departments</p>
          <h2>8</h2>
          <span className="chart-success">
            ↑ 1 this month
          </span>
        </div>
      </div>


      {/* Present Today */}
      <div className="chart-card">
        <div className="chart-icon present">
          <CalendarCheck size={28} strokeWidth={2.2} />
        </div>

        <div className="chart-info">
          <p>Present Today</p>
          <h2>108</h2>
          <span className="chart-success">
            87% attendance
          </span>
        </div>
      </div>


      {/* On Leave */}
      <div className="chart-card">
        <div className="chart-icon leave">
          <Plane size={28} strokeWidth={2.2} />
        </div>

        <div className="chart-info">
          <p>On Leave</p>
          <h2>12</h2>
          <span className="chart-warning">
            Today
          </span>
        </div>
      </div>


      {/* Absent Today */}
      <div className="chart-card">
        <div className="chart-icon absent">
          <UserX size={28} strokeWidth={2.2} />
        </div>

        <div className="chart-info">
          <p>Absent Today</p>
          <h2>4</h2>
          <span className="chart-danger">
            3% attendance
          </span>
        </div>
      </div>

    </div>
  );
};

export default DashboardChart;