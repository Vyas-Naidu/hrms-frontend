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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const result = await loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard", { replace: true });
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <div className={styles["password-box"]}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className={styles["eye-btn"]}
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className={styles["login-options"]}>
              <label className={styles["remember"]}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() =>
                    setRememberMe((value) => !value)
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

            <button
              className={styles["login-btn"]}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;