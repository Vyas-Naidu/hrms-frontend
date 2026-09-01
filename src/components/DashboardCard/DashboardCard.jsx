import styles from "./DashboardCard.module.css";
import { FaArrowTrendUp } from "react-icons/fa6";

function DashboardCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <div className={styles["dashboard-card"]}>

      <div
        className={styles["card-icon"]}
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className={styles["card-content"]}>

        <span className={styles["card-title"]}>
          {title}
        </span>

        <h2>{value}</h2>

        {change && (
          <div className={styles["card-change"]}>

            <FaArrowTrendUp />

            <span>{change}</span>

          </div>
        )}

      </div>

    </div>
  );
}

export default DashboardCard;