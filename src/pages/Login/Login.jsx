import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Eye,
  EyeOff,
} from "lucide-react";

import { loginUser } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const result = loginUser(role, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");

    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;

      case "hr":
        navigate("/hr/dashboard");
        break;

      case "employee":
        navigate("/employee/dashboard");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <div className={styles["login-page"]}>
      {/* Left Side */}
      <div className={styles["login-left"]}>
        <div className={styles["brand-box"]}>
          <UserRound className={styles["brand-icon"]} />

          <h1>HRMS</h1>

          <h2>Human Resource Management System</h2>

          <p>
            Manage Employees, Recruitment, Attendance,
            Payroll, Leave, Performance and more from one
            modern platform.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles["login-right"]}>
        <div className={styles["login-card"]}>

          <h2>Welcome Back</h2>

          <p>Please login to continue</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <label>Password</label>

            <div className={styles["password-box"]}>
              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className={styles["eye-btn"]}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff />
                ) : (
                <Eye />
                )}
              </button>
            </div>

            <div className={styles["login-options"]}>

              <label className={styles["remember"]}>

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() =>
                    setRememberMe(!rememberMe)
                  }
                />

                Remember Me
              </label>

              <span className={styles["forgot"]}>
                Forgot Password?
              </span>

            </div>

            {error && (
              <p className={styles["error"]}>
                {error}
              </p>
            )}
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
            </select>

            <button
              className={styles["login-btn"]}
              type="submit"
            >
      
              Login
            </button>

          </form>

          {/* <div className={styles["demo-box"]}>
            <h4>Demo Credentials</h4>

            <p>
              <strong>Admin</strong> :
              admin@gmail.com /
              admin@123
            </p>

            <p>
              <strong>HR</strong> :
              hr@gmail.com /
              hr@123
            </p>

            <p>
              <strong>Employee</strong> :
              employee@gmail.com /
              employee@123
            </p>

          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Login;