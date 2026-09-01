import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./LeaveManagementGraph.css";

const LeaveManagementGraph = () => {
  return (
    <div className="leave-management-graphs">

      {/* ==========================
          LEAVE USAGE OVERVIEW
      ========================== */}

      <div className="leave-chart-card usage-card">

        <h3>Leave Usage Overview</h3>

        <div className="usage-content">

          <div className="usage-donut">
            <div className="usage-donut-center">
              <strong>18</strong>
              <span>Total Leaves</span>
              <small>This Year</small>
            </div>
          </div>

          <div className="usage-legend">

            <div>
              <span className="legend-dot green"></span>
              <p>Casual Leave </p>
              <b> (44.44%)</b>
            </div>

            <div>
              <span className="legend-dot blue"></span>
              <p>Sick Leave</p>
              <b>5 (27.78%)</b>
            </div>

            <div>
              <span className="legend-dot purple"></span>
              <p>Earned Leave</p>
              <b>5 (27.78%)</b>
            </div>

          </div>

        </div>

      </div>


      {/* ==========================
          LEAVE TREND
      ========================== */}

      <div className="leave-chart-card trend-card">

        <div className="chart-title-row">
          <h3>
            Leave Trend <span>(This Year)</span>
          </h3>

          <div className="trend-legend">
            <span>
              <i className="green"></i>
              Casual Leave
            </span>

            <span>
              <i className="blue"></i>
              Sick Leave
            </span>

            <span>
              <i className="purple"></i>
              Earned Leave
            </span>
          </div>
        </div>

        <div className="trend-chart">

          <div className="y-axis">
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>

          <div className="chart-area">

            <div className="grid-line"></div>
            <div className="grid-line"></div>
            <div className="grid-line"></div>
            <div className="grid-line"></div>
            <div className="grid-line"></div>

            <svg
              className="trend-svg"
              viewBox="0 0 700 190"
              preserveAspectRatio="none"
            >

              {/* Casual Leave */}
              <polyline
                points="
                  0,145
                  55,150
                  110,105
                  165,35
                  220,90
                  275,110
                  330,155
                  385,140
                  440,160
                  495,175
                  550,178
                  605,160
                  660,145
                "
                fill="none"
                stroke="#622B14"
                strokeWidth="3"
              />

              {/* Sick Leave */}
              <polyline
                points="
                  0,175
                  55,175
                  110,125
                  165,85
                  220,120
                  275,135
                  330,150
                  385,140
                  440,170
                  495,170
                  550,170
                  605,170
                  660,175
                "
                fill="none"
                stroke="#978F66"
                strokeWidth="3"
              />

              {/* Earned Leave */}
              <polyline
                points="
                  0,180
                  55,180
                  110,160
                  165,135
                  220,165
                  275,155
                  330,175
                  385,178
                  440,178
                  495,180
                  550,180
                  605,180
                  660,180
                "
                fill="none"
                stroke="#E4D6A9"
                strokeWidth="3"
              />

            </svg>

            <div className="x-axis">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>

          </div>

        </div>

      </div>


      {/* ==========================
          LEAVE STATUS
      ========================== */}

      <div className="leave-chart-card status-card">

        <h3>Leave Status</h3>

        <div className="status-content">

          <div className="status-donut">
            <div className="status-donut-center">
              <strong>06</strong>
              <span>Pending</span>
              <small>Requests</small>
            </div>
          </div>

          <div className="status-legend">

            <div>
              <i className="orange"></i>
              <span>Pending</span>
              <b>06</b>
            </div>

            <div>
              <i className="green"></i>
              <span>Approved</span>
              <b>24</b>
            </div>

            <div>
              <i className="red"></i>
              <span>Rejected</span>
              <b>04</b>
            </div>

            <div>
              <i className="blue"></i>
              <span>Cancelled</span>
              <b>02</b>
            </div>

          </div>

        </div>

      </div>

</div>
      
  );
};

export default LeaveManagementGraph;