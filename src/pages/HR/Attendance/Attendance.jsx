import React from "react";
import AttendanceCards from "./AttendanceCards";
import AttendanceGraph from "./AttendanceGraph";
import AttendanceTable from "./AttendanceTable";
import styles from "./Attendance.module.css";

const Attendance = () => {
  return (
    <div className={styles["attendance-page"]}>
      <AttendanceCards />
      <AttendanceGraph />
      <AttendanceTable />
    </div>
  );
};

export default Attendance;