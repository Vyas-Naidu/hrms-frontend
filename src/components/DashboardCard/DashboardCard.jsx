import "./DashboardCard.css";
import { FaArrowTrendUp } from "react-icons/fa6";

function DashboardCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <div className="dashboard-card">

      <div
        className="card-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="card-content">

        <span className="card-title">
          {title}
        </span>

        <h2>{value}</h2>

        {change && (
          <div className="card-change">

            <FaArrowTrendUp />

            <span>{change}</span>

          </div>
        )}

      </div>

    </div>
  );
}

export default DashboardCard;