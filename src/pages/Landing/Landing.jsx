import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles["landing"]}>
      <div className={styles["overlay"]}></div>

      <div className={styles["landing-content"]}>
        <div className={styles["logo"]}>
          <FaUsers />
          <h1>HRMS</h1>
        </div>

        <h2>Human Resource Management System</h2>

        <p>
          Manage Employees, Attendance, Payroll, Recruitment,
          Leave and Performance from one powerful platform.
        </p>

        <button
          className={styles["start-btn"]}
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;