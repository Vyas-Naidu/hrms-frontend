import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  // Temporary mock data.
  // This will be replaced with notification API data later.
  const notifications = [
    {
      id: 1,
      message: "New employee registered",
    },
    {
      id: 2,
      message: "Employee document uploaded",
    },
    {
      id: 3,
      message: "New leave request received",
    },
  ];

  const handleNotificationClick = () => {
    navigate("/notifications");
    setShowNotifications(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Left */}
      <div className={styles["navbar-left"]}>
        <div>
          {/* Reserved for future navbar title/content */}
        </div>
      </div>

      {/* Center */}
      <div className={styles["navbar-search"]}>
        <FaSearch className={styles["search-icon"]} />

        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>

      {/* Right */}
      <div className={styles["navbar-right"]}>
        {/* Notifications */}
        <div className={styles["notification-wrapper"]}>
          <button
            type="button"
            className={styles["icon-btn"]}
            onClick={() => setShowNotifications((value) => !value)}
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={showNotifications}
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
                  <button
                    key={notification.id}
                    type="button"
                    className={styles["notification-item"]}
                    onClick={handleNotificationClick}
                  >
                    <FaBell aria-hidden="true" />

                    <span>{notification.message}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Email */}
        <button
          type="button"
          className={styles["icon-btn"]}
          onClick={() => navigate("/email")}
          title="Email"
          aria-label="Email"
        >
          <FaEnvelope />

          <span className={styles.badge}>5</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;