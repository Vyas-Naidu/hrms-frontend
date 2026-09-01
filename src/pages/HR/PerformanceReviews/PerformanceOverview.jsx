import React from "react";
import styles from "./PerformanceOverview.module.css";

const ratings = [
  { name: "Communication", score: 4.5 },
  { name: "Technical Skills", score: 4.2 },
  { name: "Leadership", score: 4.5 },
  { name: "Teamwork", score: 4.2 },
  { name: "Productivity", score: 4.2 },
];

const PerformanceOverview = () => {
  return (
    <div className={styles["performance-overview"]}>

      {/* Rating Overview */}
      <div className={styles["rating-overview"]}>
        <div className={styles["overview-title"]}>
          <h2>Rating Overview</h2>
          <span>Inter Medium</span>
        </div>

        <div className={styles["rating-chart"]}>
          <div className={styles["y-axis"]}>
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>

          <div className={styles["chart-area"]}>
            <div className={styles["chart-grid"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className={styles["bars"]}>
              {ratings.map((item, index) => (
                <div className={styles["bar-column"]} key={index}>
                  <div
                    className={styles["rating-bar"]}
                    style={{
                      height: `${(item.score / 5) * 180}px`,
                    }}
                  ></div>

                  <span className={styles["bar-label"]}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className={styles["kpi-overview"]}>
        <div className={styles["overview-title"]}>
          <h2>Key Performance Indicators</h2>
          <span>Inter Medium</span>
        </div>

        <div className={styles["kpi-list"]}>
          {ratings.map((item, index) => (
            <div className={styles["kpi-row"]} key={index}>
              <span className={styles["kpi-name"]}>
                {item.name}
              </span>

              <div className={styles["kpi-progress"]}>
                <div
                  className={styles["kpi-progress-fill"]}
                  style={{
                    width: `${(item.score / 5) * 100}%`,
                  }}
                ></div>
              </div>

              <span className={styles["kpi-score"]}>
                {item.score}/5
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PerformanceOverview;