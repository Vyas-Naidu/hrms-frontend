import React from "react";
import {
  UsersRound,
  UserRoundX,
  Clock3,
  UserRoundCheck,
} from "lucide-react";
import styles from "./AttendanceCards.module.css";

const AttendanceCards = () => {
  const cards = [
    {
      title: "Present Employees",
      value: "154",
      change: "↑ 8%",
      text: "vs last week",
      icon: <UsersRound />,
      type: "present",
    },
    {
      title: "Absent Employees",
      value: "12",
      change: "↓ 4%",
      text: "vs last week",
      icon: <UserRoundX />,
      type: "absent",
    },
    {
      title: "Employees on Leave",
      value: "8",
      change: "↑ 2%",
      text: "vs last week",
      icon: <Clock3 />,
      type: "leave",
    },
    {
      title: "Total Employees",
      value: "174",
      change: "-",
      text: "Total Strength",
      icon: <UserRoundCheck />,
      type: "total",
    },
  ];

  return (
    <div className={styles["attendance-cards"]}>
      {cards.map((card, index) => (
        <div className={styles["attendance-card"]} key={index}>
          <div className={[styles["attendance-icon"], styles[card.type]].filter(Boolean).join(" ")}>
            {card.icon}
          </div>

          <div className={styles["attendance-card-content"]}>
            <h4>{card.title}</h4>

            <div className={styles["attendance-value"]}>
              <span>{card.value}</span>
              <strong className={styles[card.type]}>
                {card.change}
              </strong>
            </div>

            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceCards;