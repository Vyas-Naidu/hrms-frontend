import React from "react";
import "./PerformanceOverview.css";

const ratings = [
  { name: "Communication", score: 4.5 },
  { name: "Technical Skills", score: 4.2 },
  { name: "Leadership", score: 4.5 },
  { name: "Teamwork", score: 4.2 },
  { name: "Productivity", score: 4.2 },
];

const PerformanceOverview = () => {
  return (
    <div className="performance-overview">

      {/* Rating Overview */}
      <div className="rating-overview">
        <div className="overview-title">
          <h2>Rating Overview</h2>
          <span>Inter Medium</span>
        </div>

        <div className="rating-chart">
          <div className="y-axis">
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>

          <div className="chart-area">
            <div className="chart-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="bars">
              {ratings.map((item, index) => (
                <div className="bar-column" key={index}>
                  <div
                    className="rating-bar"
                    style={{
                      height: `${(item.score / 5) * 180}px`,
                    }}
                  ></div>

                  <span className="bar-label">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-overview">
        <div className="overview-title">
          <h2>Key Performance Indicators</h2>
          <span>Inter Medium</span>
        </div>

        <div className="kpi-list">
          {ratings.map((item, index) => (
            <div className="kpi-row" key={index}>
              <span className="kpi-name">
                {item.name}
              </span>

              <div className="kpi-progress">
                <div
                  className="kpi-progress-fill"
                  style={{
                    width: `${(item.score / 5) * 100}%`,
                  }}
                ></div>
              </div>

              <span className="kpi-score">
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