import styles from "./QuickActionCard.module.css";
import { FaArrowRight } from "react-icons/fa";

function QuickActionCard({
  title,
  subtitle,
  icon,
  color = "#9C5A2E",
  onClick,
}) {
  return (
    <div
      className={styles["quick-action-card"]}
      onClick={onClick}
    >
      <div
        className={styles["quick-action-icon"]}
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className={styles["quick-action-content"]}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      <FaArrowRight className={styles["quick-arrow"]} />
    </div>
  );
}

export default QuickActionCard;