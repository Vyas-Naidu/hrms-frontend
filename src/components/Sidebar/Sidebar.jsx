import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaUsers,
  FaCalendarCheck,
  FaCalendarAlt,
  FaStar,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

const navigationGroups = [
  {
    items: [
      { label: "Dashboard", path: "/hr/dashboard", icon: FaHome },
    ],
  },
  {
    items: [
      { label: "Departments", path: "/hr/departments", icon: FaBuilding },
      { label: "Designations", path: "/hr/designations", icon: FaClipboardList },
      { label: "Employees", path: "/hr/employeemanagement", icon: FaUsers },
    ],
  },
  {
    items: [
      { label: "Attendance", path: "/hr/attendance", icon: FaCalendarCheck },
      { label: "Leave Management", path: "/hr/leave-management", icon: FaCalendarAlt },
      { label: "Performance Reviews", path: "/hr/performance-reviews", icon: FaStar },
      { label: "Reports", path: "/hr/reports", icon: FaFileAlt },
    ],
  },
];

function Sidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) {
  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${
        mobileOpen ? styles.mobileOpen : ""
      }`}
      aria-label="Main navigation"
    >
      <div className={styles.logoArea}>
        <img
          src="/hrms-logo.png"
          alt="HRMS"
          className={`${styles.logo} ${styles.logoFull}`}
        />

        {/* Put the collapsed/icon version at public/hrms-logo-icon.png */}
        <img
          src="/hrms-logo-icon.png"
          alt="HRMS"
          className={`${styles.logo} ${styles.logoCollapsed}`}
        />
      </div>

      {/* Desktop collapse button */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        ☰
      </button>

      {/* Mobile close button */}
      <button
        type="button"
        className={styles.mobileCloseButton}
        onClick={onMobileClose}
        aria-label="Close navigation"
      >
        ×
      </button>

      <nav className={styles.navigation}>
        {navigationGroups.map((group, groupIndex) => (
          <div className={styles.group} key={groupIndex}>
            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.icon}>
                    <Icon />
                  </span>

                  <span className={styles.label}>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.bottom}>
        <button type="button" className={styles.logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

        <button
          type="button"
          className={styles.profile}
          title={collapsed ? "Dominic Toretto" : undefined}
        >
          <span className={styles.avatar}>
            <FaUser />
          </span>

          <span className={styles.profileInfo}>
            <strong>Dominic Toretto</strong>
            <small>HR Administrator</small>
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
