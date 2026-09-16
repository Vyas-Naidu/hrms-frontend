import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

import styles from "./Navbar.module.css";

function Navbar({ user }) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "New employee registered",
      employeeId: 3,
    },
    {
      id: 2,
      message: "Employee document uploaded",
      employeeId: 5,
    },
    {
      id: 3,
      message: "New leave request received",

    },
  ];

  return (
    <nav className={styles.navbar}>

      {/* Left */}
      <div className={styles["navbar-left"]}>

        {/* <button className={styles["menu-btn"]}>
          <FaBars />
        </button> */}

        <div>
          {/* <h2>HRMS</h2> */}
          {/* <p>Welcome back, {user?.name}</p> */}
        </div>

      </div>

      {/* Center */}
      <div className={styles["navbar-search"]}>

        <FaSearch className={styles["search-icon"]} />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Right */}
      <div className={styles["navbar-right"]}>

        <div className={styles["notification-wrapper"]}>

          <button
            className={styles["icon-btn"]}
            onClick={() => navigate("/hr/notifications")}
            title="Notifications"
          >
            <FaBell />

            {notifications.length > 0 && (
              <span className={styles.badge}>
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className={styles["notification-dropdown"]}>

              <div className={styles["notification-header"]}>
                Notifications
              </div>

              {notifications.length === 0 ? (
                <div className={styles["no-notification"]}>
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles["notification-item"]}
                    onClick={() => {
                      if (notification.employeeId) {
                        navigate(`/hr/employees/${notification.employeeId}`);
                        setShowNotifications(false);
                      }
                    }}
                  >
                    <FaBell />

                    <span>{notification.message}</span>
                  </div>
                ))
              )}

            </div>
          )}

        </div>
        <button
          className={styles["icon-btn"]}
          onClick={() => navigate("/hr/email")}
          title="Email"
        >
          <FaEnvelope />

          <span className={styles.badge}>
            5
          </span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;