import React from "react";
import {
  FileText,
  TrendingUp,
  Download,
  CalendarClock,
} from "lucide-react";
import "./ReportsCard.css";

const ReportsCard = () => {
  const cards = [
    {
      icon: FileText,
      title: "Total Reports",
      value: "32",
      text: "All time generated",
      className: "blue",
    },
    {
      icon: TrendingUp,
      title: "This Month",
      value: "8",
      text: "Reports generated",
      className: "green",
    },
    {
      icon: Download,
      title: "Total Downloads",
      value: "156",
      text: "This month",
      className: "orange",
    },
    {
      icon: CalendarClock,
      title: "Scheduled Reports",
      value: "12",
      text: "Automated reports",
      className: "purple",
    },
  ];

  return (
    <div className="reports-cards">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div className="report-card" key={index}>
            <div className={`report-card-icon ${card.className}`}>
              <Icon size={28} strokeWidth={2} />
            </div>

            <div className="report-card-content">
              <p>{card.title}</p>
              <h2>{card.value}</h2>
              <span>{card.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsCard;
