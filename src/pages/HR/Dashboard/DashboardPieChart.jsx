
import {
  Megaphone,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";

import "./DashboardPieChart.css";

const DashboardPieChart = () => {
  return (
    <div className="dashboard-bottom-row">

      {/* ==========================
          TODAY'S ATTENDANCE
      ========================== */}
      <div className="dashboard-card attendance-card">

        {/* <h3>Today's Attendance</h3> */}

        <div className="attendance-content">

          <div className="attendance-circle">
            <div className="attendance-inner">
              <strong>87%</strong>
              <span>Attendance</span>
            </div>
          </div>

          <div className="attendance-details">

            <div className="attendance-item">
              <span className="attendance-dot present"></span>
              <span>Present</span>
              <b>108 (87%)</b>
            </div>

            <div className="attendance-item">
              <span className="attendance-dot leave"></span>
              <span>On Leave</span>
              <b>12 (10%)</b>
            </div>

            <div className="attendance-item">
              <span className="attendance-dot absent"></span>
              <span>Absent</span>
              <b>4 (3%)</b>
            </div>

          </div>

        </div>

        <button className="attendance-button">
          View Attendance
          <ChevronRight size={20} />
        </button>

      </div>


      {/* ==========================
          ANNOUNCEMENTS
      ========================== */}
      <div className="dashboard-card announcements-card">

        <h3>Announcements</h3>

        <div className="announcement-list">

          <div className="announcement-item">
            <Megaphone size={20} />

            <div className="announcement-info">
              <strong>Office closed on May 20, 2025</strong>
              <span>May 15, 2025</span>
            </div>
          </div>


          <div className="announcement-item">
            <Calendar size={20} />

            <div className="announcement-info">
              <strong>Team meeting on May 18, 2025</strong>
              <span>May 14, 2025</span>
            </div>
          </div>


          <div className="announcement-item">
            <FileText size={20} />

            <div className="announcement-info">
              <strong>Please submit your timesheet</strong>
              <span>May 13, 2025</span>
            </div>
          </div>

        </div>

        <button className="view-all-button">
          View All
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default DashboardPieChart;