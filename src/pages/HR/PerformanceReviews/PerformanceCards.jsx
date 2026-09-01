import React from "react";
import styles from "./PerformanceCards.module.css";

const performanceData = [
  {
    icon: "☆",
    count: 18,
    title: "Excellent",
    description: "High potential, exceptional performance",
    className: "excellent",
  },
  {
    icon: "♧",
    count: 35,
    title: "Good",
    description: "Consistently meets or exceeds expectations",
    className: "good",
  },
  {
    icon: "▥",
    count: 28,
    title: "Average",
    description: "Meets expectations",
    className: "average",
  },
  {
    icon: "↗",
    count: 7,
    title: "Needs Improvement",
    description: "Performance requires focused development",
    className: "improvement",
  },
];

const PerformanceCards = () => {
  return (
    <div className={styles["performance-cards"]}>
      {performanceData.map((item, index) => (
        <div
          className={[styles["performance-card"], styles[item.className]].filter(Boolean).join(" ")}
          key={index}
        >
          <div className={"performance-icon"}>
            {item.icon}
          </div>

          <div className={"performance-content"}>
            <div className={"performance-count"}>
              {item.count}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceCards;