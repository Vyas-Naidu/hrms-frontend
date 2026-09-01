import React from "react";
import {
  CheckCircle2,
  CircleUserRound,
  CalendarClock,
} from "lucide-react";
import styles from "./AttendanceGraph.module.css";

const AttendanceGraph = () => {
  const attendanceData = [
    { name: "Present", value: 154, percent: "88.51%", color: "green" },
    { name: "Absent", value: 12, percent: "6.90%", color: "red" },
    { name: "On Leave", value: 8, percent: "4.59%", color: "orange" },
  ];

  const trend = [
    { day: "Sun", value: 112 },
    { day: "Mon", value: 142 },
    { day: "Tue", value: 135 },
    { day: "Wed", value: 149 },
    { day: "Thu", value: 151 },
    { day: "Fri", value: 160 },
    { day: "Sat", value: 154 },
  ];

  return (
    <div className={styles["attendance-graphs"]}>

      {/* Attendance Overview */}
      <div className={styles["attendance-overview"]}>
        <h3>Attendance Overview</h3>

        <div className={styles["overview-content"]}>
          <div className={styles["donut-wrapper"]}>
            <div className={styles["donut"]}>
              <div className={styles["donut-center"]}>
                <strong>174</strong>
                <span>Total</span>
              </div>
            </div>
          </div>

          <div className={styles["attendance-legend"]}>
            {attendanceData.map((item, index) => (
              <div className={styles["legend-item"]} key={index}>
                <span className={[styles["legend-dot"], styles[item.color]].filter(Boolean).join(" ")}></span>

                <span className={"legend-name"}>
                  {item.name}
                </span>

                <strong>
                  {item.value} ({item.percent})
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["attendance-message"]}>
          <CheckCircle2 size={20} />
          Great! Your team attendance is excellent this week.
        </div>
      </div>

      {/* Attendance Trend */}
      <div className={styles["attendance-trend"]}>
        <div className={styles["trend-header"]}>
          <h3>Attendance Trend (This Week)</h3>

          <select defaultValue="This Week">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>

        <div className={styles["chart"]}>
          <div className={styles["chart-lines"]}>
            <span>200</span>
            <span>160</span>
            <span>120</span>
            <span>80</span>
            <span>40</span>
            <span>0</span>
          </div>

          <div className={styles["chart-area"]}>
            <svg
              viewBox="0 0 700 260"
              preserveAspectRatio="none"
            >
              <polyline
                points="20,190 125,100 230,125 335,80 440,72 545,30 650,65"
                fill="none"
                stroke="#9b4817"
                strokeWidth="3"
              />

              {trend.map((item, index) => {
                const points = [
                  [20, 190],
                  [125, 100],
                  [230, 125],
                  [335, 80],
                  [440, 72],
                  [545, 30],
                  [650, 65],
                ];

                return (
                  <g key={index}>
                    <circle
                      cx={points[index][0]}
                      cy={points[index][1]}
                      r="5"
                      fill="#fff"
                      stroke="#995F2F"
                      strokeWidth="3"
                    />

                    <text
                      x={points[index][0]}
                      y={points[index][1] - 15}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="600"
                    >
                      {item.value}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className={styles["chart-days"]}>
              {trend.map((item, index) => (
                <span key={index}>{item.day}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["trend-summary"]}>
          <div>
            <strong>Highest: 160 (Fri)</strong>
          </div>

          <div>
            <strong>Lowest: 112 (Sun)</strong>
          </div>

          <div>
            <strong>Average: 143.29</strong>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AttendanceGraph;