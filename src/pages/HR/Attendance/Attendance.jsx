import React from "react";
import AttendanceCards from "./AttendanceCards";
import AttendanceGraph from "./AttendanceGraph";
import AttendanceTable from "./AttendanceTable";
import "./Attendance.css";

const Attendance = () => {
  return (
    <div className="attendance-page">
      <AttendanceCards />
      <AttendanceGraph />
      <AttendanceTable />
    </div>
  );
};

export default Attendance;