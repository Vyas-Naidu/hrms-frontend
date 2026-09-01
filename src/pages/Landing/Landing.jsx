import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="overlay"></div>

      <div className="landing-content">
        <div className="logo">
          <FaUsers />
          <h1>HRMS</h1>
        </div>

        <h2>Human Resource Management System</h2>

        <p>
          Manage Employees, Attendance, Payroll, Recruitment,
          Leave and Performance from one powerful platform.
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;